"use client";

import React, { useEffect, useRef } from "react";

const PHRASES = [
  "meow!",
  "purrrrr...",
  "zZZ...",
  "where is fish?",
];

// Mapping actions to the 8 rows in catsprite.webp (4 cols x 8 rows)
const ACTION_TO_ROW: Record<string, number> = {
  WALK_DOWN: 0,
  WALK_RIGHT: 1,
  WALK_UP: 2,
  WALK_LEFT: 3,
  LICKING: 4,
  SITTING: 5,
  PLAYFUL: 6,
  SLEEPING: 7,
};
const TOTAL_ROWS = 8;
const TOTAL_COLS = 4;

const CELL_W = 44; // Display width of one sprite frame
const CELL_H = 48; // Display height of one sprite frame

/**
 * FIX: previously this used fixed pixel backgroundSize (CELL_W*4 x CELL_H*8),
 * which assumes the source image's native cell size matches 44x48 exactly.
 * The real sprite sheet is 861x1779px, so each native cell is ~215.25x222.375 -
 * a slightly different aspect ratio than 44x48, which caused mild stretching.
 * Using percentages for backgroundSize/backgroundPosition sidesteps this
 * entirely: browsers scale the whole image to the element's box regardless
 * of native resolution, so cropping by percentage is always exact no matter
 * what the underlying file's real pixel dimensions are.
 */
function CatSprite({ action, col }: { action: string; col: number }) {
  const row = ACTION_TO_ROW[action] ?? 5; // Default to SITTING row

  const bgSizeX = TOTAL_COLS * 100; // e.g. 400%
  const bgSizeY = TOTAL_ROWS * 100; // e.g. 800%
  const posX = TOTAL_COLS > 1 ? (col / (TOTAL_COLS - 1)) * 100 : 0;
  const posY = TOTAL_ROWS > 1 ? (row / (TOTAL_ROWS - 1)) * 100 : 0;

  return (
    <div
      style={{
        width: `${CELL_W}px`,
        height: `${CELL_H}px`,
        backgroundImage: "url('/catsprite.webp')",
        backgroundColor: "transparent", // never let a parent bg peek through
        backgroundSize: `${bgSizeX}% ${bgSizeY}%`,
        backgroundPosition: `${posX}% ${posY}%`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        filter: "drop-shadow(1.5px 2px 0px rgba(0,0,0,0.3))",
      }}
    />
  );
}

const CELL_SIZE = 25;

interface Point {
  x: number;
  y: number;
}

interface AStarNode {
  gx: number;
  gy: number;
  g: number;
  h: number;
  f: number;
  parent: AStarNode | null;
}

export default function CursorCat() {
  // DOM refs we mutate directly every animation frame (no React re-render).
  const containerRef = useRef<HTMLDivElement>(null);
  const spriteHostRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Logical/physics state lives in refs, not React state, so the 60fps
  // animation loop never triggers a re-render. This is FIX #2: previously
  // setPos() (React state) was called every single rAF tick, forcing a full
  // component re-render 60x/sec - the likely cause of the janky "shift"
  // feeling while the cat was walking.
  const posRef = useRef<Point>({ x: 0, y: 0 });
  const pathRef = useRef<Point[]>([]);
  const modeRef = useRef<"IDLE" | "NAVIGATING">("IDLE");
  const actionRef = useRef("SITTING");
  const colRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const readyRef = useRef(false); // becomes true once we've placed the cat

  // Imperatively push current state to the DOM. Called from the rAF loop.
  const paintPosition = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.left = `${posRef.current.x}px`;
    el.style.top = `${posRef.current.y}px`;
  };

  const paintSprite = () => {
    const host = spriteHostRef.current;
    if (!host) return;
    const row = ACTION_TO_ROW[actionRef.current] ?? 5;
    const bgSizeX = TOTAL_COLS * 100;
    const bgSizeY = TOTAL_ROWS * 100;
    const posX = TOTAL_COLS > 1 ? (colRef.current / (TOTAL_COLS - 1)) * 100 : 0;
    const posY = TOTAL_ROWS > 1 ? (row / (TOTAL_ROWS - 1)) * 100 : 0;
    host.style.backgroundPosition = `${posX}% ${posY}%`;
  };

  // Bounding Box Obstacle Detection (in Document Space)
  //
  // FIX #1 (the "click shift" bug): the old selector list included bare
  // "p", "h1", "h2", "h3", "h4", and "button" tags with no scoping. On a
  // normal content-heavy page that turns the vast majority of the page into
  // "obstacle," so a click anywhere near text got silently redirected by
  // findClosestSafeCell() to the nearest non-text patch - often far from
  // where you actually clicked. We now only block on layout-level
  // containers (cards/sections/nav chrome) plus buttons, which are small
  // and specific. Generic paragraph/heading text no longer blocks pathing.
  const getObstacleRects = (): DOMRect[] => {
    if (typeof window === "undefined" || typeof document === "undefined") return [];
    const selectors = [
      ".profile-card",
      ".skills-section",
      ".experience-section",
      ".project-card",
      ".journal-card",
      ".retro-btn",
      ".retro-window",
      ".media-card",
      ".explore-card",
      ".routine-card",
      ".recipe-card",
      ".staple-card",
      ".github-heatmap",
      ".learning-log",
      "header.page-header",
      "footer.get-in-touch",
      "button",
    ];
    const elements = document.querySelectorAll(selectors.join(", "));
    const rects: DOMRect[] = [];
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    elements.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 12 && r.height > 12) {
        rects.push(new DOMRect(r.left + scrollX, r.top + scrollY, r.width, r.height));
      }
    });
    return rects;
  };

  const isBoxColliding = (x: number, y: number, radius = 16, obstacleRects: DOMRect[]): boolean => {
    if (typeof window === "undefined" || typeof document === "undefined") return false;
    const docWidth = document.documentElement.scrollWidth;
    const docHeight = document.documentElement.scrollHeight;
    if (x < 25 || x > docWidth - 25 || y < 25 || y > docHeight - 25) return true;

    const box = {
      left: x - radius,
      right: x + radius,
      top: y - radius,
      bottom: y + radius
    };

    for (const r of obstacleRects) {
      if (
        box.left < r.right &&
        box.right > r.left &&
        box.top < r.bottom &&
        box.bottom > r.top
      ) {
        return true;
      }
    }
    return false;
  };

  const hasLineOfSight = (p1: Point, p2: Point, obstacleRects: DOMRect[]): boolean => {
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const steps = Math.ceil(dist / 10);
    if (steps === 0) return true;

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const sx = p1.x + (p2.x - p1.x) * t;
      const sy = p1.y + (p2.y - p1.y) * t;
      if (isBoxColliding(sx, sy, 14, obstacleRects)) {
        return false;
      }
    }
    return true;
  };

  const findClosestSafeCell = (gx: number, gy: number, cols: number, rows: number, obstacleRects: DOMRect[]): { gx: number; gy: number } => {
    if (!isBoxColliding(gx * CELL_SIZE + CELL_SIZE / 2, gy * CELL_SIZE + CELL_SIZE / 2, 16, obstacleRects)) {
      return { gx, gy };
    }
    const visited = new Set<string>();
    const queue: Array<{ gx: number; gy: number }> = [{ gx, gy }];
    visited.add(`${gx},${gy}`);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = curr.gx + dx;
          const ny = curr.gy + dy;
          if (nx >= 1 && nx < cols - 1 && ny >= 1 && ny < rows - 1) {
            const key = `${nx},${ny}`;
            if (!visited.has(key)) {
              visited.add(key);
              if (!isBoxColliding(nx * CELL_SIZE + CELL_SIZE / 2, ny * CELL_SIZE + CELL_SIZE / 2, 16, obstacleRects)) {
                return { gx: nx, gy: ny };
              }
              if (visited.size < 250) {
                queue.push({ gx: nx, gy: ny });
              }
            }
          }
        }
      }
    }
    return { gx, gy };
  };

  const computePath = (startX: number, startY: number, endX: number, endY: number): Point[] => {
    const obstacleRects = getObstacleRects();
    const docWidth = document.documentElement.scrollWidth;
    const docHeight = document.documentElement.scrollHeight;
    const cols = Math.ceil(docWidth / CELL_SIZE);
    const rows = Math.ceil(docHeight / CELL_SIZE);

    let startGx = Math.floor(startX / CELL_SIZE);
    let startGy = Math.floor(startY / CELL_SIZE);
    let endGx = Math.floor(endX / CELL_SIZE);
    let endGy = Math.floor(endY / CELL_SIZE);

    const safeStart = findClosestSafeCell(startGx, startGy, cols, rows, obstacleRects);
    startGx = safeStart.gx;
    startGy = safeStart.gy;

    const safeEnd = findClosestSafeCell(endGx, endGy, cols, rows, obstacleRects);
    endGx = safeEnd.gx;
    endGy = safeEnd.gy;

    if (startGx === endGx && startGy === endGy) {
      return [{ x: endGx * CELL_SIZE + CELL_SIZE / 2, y: endGy * CELL_SIZE + CELL_SIZE / 2 }];
    }

    const openList: AStarNode[] = [];
    const closedSet = new Set<string>();

    const startNode: AStarNode = {
      gx: startGx,
      gy: startGy,
      g: 0,
      h: Math.hypot(endGx - startGx, endGy - startGy),
      f: Math.hypot(endGx - startGx, endGy - startGy),
      parent: null
    };

    openList.push(startNode);
    let iterations = 0;
    let bestNode = startNode;

    while (openList.length > 0 && iterations < 1500) {
      iterations++;
      openList.sort((a, b) => a.f - b.f);
      const curr = openList.shift()!;

      if (curr.h < bestNode.h) {
        bestNode = curr;
      }

      if (curr.gx === endGx && curr.gy === endGy) {
        bestNode = curr;
        break;
      }

      const key = `${curr.gx},${curr.gy}`;
      closedSet.add(key);

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = curr.gx + dx;
          const ny = curr.gy + dy;

          if (nx < 1 || nx >= cols - 1 || ny < 1 || ny >= rows - 1) continue;
          if (closedSet.has(`${nx},${ny}`)) continue;

          if (dx !== 0 && dy !== 0) {
            if (isBoxColliding((curr.gx + dx) * CELL_SIZE + CELL_SIZE / 2, curr.gy * CELL_SIZE + CELL_SIZE / 2, 16, obstacleRects) ||
              isBoxColliding(curr.gx * CELL_SIZE + CELL_SIZE / 2, (curr.gy + dy) * CELL_SIZE + CELL_SIZE / 2, 16, obstacleRects)) {
              continue;
            }
          }

          const wx = nx * CELL_SIZE + CELL_SIZE / 2;
          const wy = ny * CELL_SIZE + CELL_SIZE / 2;
          if (isBoxColliding(wx, wy, 16, obstacleRects)) continue;

          const stepCost = (dx !== 0 && dy !== 0) ? 1.414 : 1.0;
          const g = curr.g + stepCost;
          const h = Math.hypot(endGx - nx, endGy - ny);
          const f = g + h;

          const existing = openList.find(n => n.gx === nx && n.gy === ny);
          if (existing) {
            if (g < existing.g) {
              existing.g = g;
              existing.f = f;
              existing.parent = curr;
            }
          } else {
            openList.push({ gx: nx, gy: ny, g, h, f, parent: curr });
          }
        }
      }
    }

    const rawWaypoints: Point[] = [];
    let currNode: AStarNode | null = bestNode;
    while (currNode !== null) {
      rawWaypoints.unshift({
        x: currNode.gx * CELL_SIZE + CELL_SIZE / 2,
        y: currNode.gy * CELL_SIZE + CELL_SIZE / 2
      });
      currNode = currNode.parent;
    }

    if (rawWaypoints.length <= 2) return rawWaypoints;

    const simplified: Point[] = [rawWaypoints[0]];
    let idx = 0;
    while (idx < rawWaypoints.length - 1) {
      let furthest = idx + 1;
      for (let i = rawWaypoints.length - 1; i > idx + 1; i--) {
        if (hasLineOfSight(rawWaypoints[idx], rawWaypoints[i], obstacleRects)) {
          furthest = i;
          break;
        }
      }
      simplified.push(rawWaypoints[furthest]);
      idx = furthest;
    }

    return simplified;
  };

  const findSafePoint = (maxRetries = 35): Point => {
    const obstacleRects = getObstacleRects();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const viewWidth = window.innerWidth - 60;
    const viewHeight = window.innerHeight - 60;

    for (let i = 0; i < maxRetries; i++) {
      const rx = scrollX + Math.max(40, Math.random() * viewWidth);
      const ry = scrollY + Math.max(40, Math.random() * viewHeight);
      if (!isBoxColliding(rx, ry, 16, obstacleRects)) {
        return { x: rx, y: ry };
      }
    }
    return { x: scrollX + 40, y: scrollY + viewHeight - 40 };
  };

  const showSpeech = (text: string, duration: number) => {
    const bubble = bubbleRef.current;
    if (!bubble) return;
    bubble.textContent = text;
    bubble.style.display = "block";
    window.clearTimeout((bubble as any)._hideTimer);
    (bubble as any)._hideTimer = window.setTimeout(() => {
      bubble.style.display = "none";
    }, duration);
  };

  const scheduleNextIdleAction = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    const delay = Math.floor(Math.random() * 3500) + 3500;
    idleTimerRef.current = setTimeout(() => {
      const actions: Array<"SITTING" | "LICKING" | "SLEEPING" | "PLAYFUL" | "WALK"> = [
        "SITTING", "LICKING", "SLEEPING", "PLAYFUL", "WALK", "WALK"
      ];
      const nextAction = actions[Math.floor(Math.random() * actions.length)];

      if (nextAction === "WALK") {
        const target = findSafePoint();
        const path = computePath(posRef.current.x, posRef.current.y, target.x, target.y);
        if (path.length > 0) {
          pathRef.current = path;
          modeRef.current = "NAVIGATING";
        }
      } else {
        modeRef.current = "IDLE";
        actionRef.current = nextAction;
        colRef.current = 0;
        paintSprite();
      }

      scheduleNextIdleAction();
    }, delay);
  };

  // Mount: place the cat, kick off idle loop, wire click + animation loop.
  useEffect(() => {
    const startPoint = findSafePoint();
    posRef.current = startPoint;
    paintPosition();
    readyRef.current = true;
    if (containerRef.current) containerRef.current.style.visibility = "visible";
    scheduleNextIdleAction();

    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest(".cursor-cat-bubble") || (e.target as HTMLElement)?.closest(".cursor-cat-container")) {
        return;
      }

      const destX = e.pageX;
      const destY = e.pageY;

      const path = computePath(posRef.current.x, posRef.current.y, destX, destY);
      if (path.length > 0) {
        pathRef.current = path;
        modeRef.current = "NAVIGATING";
        showSpeech("on my way!", 1800);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      }
    };
    window.addEventListener("click", handleClick);

    let animationFrameId: number;
    const updateLoop = (timestamp: number) => {
      const currentPos = posRef.current;

      if (modeRef.current === "NAVIGATING" && pathRef.current.length > 0) {
        const target = pathRef.current[0];
        const dx = target.x - currentPos.x;
        const dy = target.y - currentPos.y;
        const dist = Math.hypot(dx, dy);

        if (Math.abs(dx) > Math.abs(dy)) {
          actionRef.current = dx > 0 ? "WALK_RIGHT" : "WALK_LEFT";
        } else {
          actionRef.current = dy > 0 ? "WALK_DOWN" : "WALK_UP";
        }

        if (dist < 12) {
          pathRef.current.shift();
          if (pathRef.current.length === 0) {
            modeRef.current = "IDLE";
            actionRef.current = "SITTING";
            colRef.current = 0;
            paintSprite();
            showSpeech("here! <3", 2000);
            scheduleNextIdleAction();
          }
        } else {
          const maxSpeed = 1.6;
          const stepX = (dx / dist) * Math.min(dist, maxSpeed);
          const stepY = (dy / dist) * Math.min(dist, maxSpeed);
          const nextX = currentPos.x + stepX;
          const nextY = currentPos.y + stepY;

          posRef.current = { x: nextX, y: nextY };
          paintPosition();

          if (timestamp - lastFrameTimeRef.current > 180) {
            colRef.current = (colRef.current + 1) % 4;
            paintSprite();
            lastFrameTimeRef.current = timestamp;
          } else {
            paintSprite();
          }
        }
      } else {
        if (timestamp - lastFrameTimeRef.current > 220) {
          colRef.current = (colRef.current + 1) % 4;
          paintSprite();
          lastFrameTimeRef.current = timestamp;
        }
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCatClick = () => {
    const el = containerRef.current;
    if (el) {
      el.style.animation = "none";
      // force reflow so the animation can be retriggered
      void el.offsetWidth;
      el.style.animation = "cat-bounce 0.4s ease";
      window.setTimeout(() => {
        if (el) el.style.animation = "none";
      }, 400);
    }
    const randomPhrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    showSpeech(randomPhrase, 2500);
  };

  return (
    <div
      ref={containerRef}
      className="cursor-cat-container"
      onClick={handleCatClick}
      style={{
        position: "absolute", // Document-relative so the cat stays put on scroll
        left: "0px",
        top: "0px",
        transform: "translate(-50%, -50%)", // Never horizontally flip!
        zIndex: 9999,
        cursor: "pointer",
        userSelect: "none",
        pointerEvents: "auto",
        visibility: "hidden", // shown once we've placed it at a real position
        background: "transparent",
      }}
      title="Click anywhere on the page and I will slowly walk to you!"
    >
      <div
        ref={bubbleRef}
        className="cursor-cat-bubble"
        style={{
          display: "none",
          transform: "translateX(-50%)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.75rem",
          background: "var(--retro-btn-bg, #FAF8F5)",
          border: "2px solid var(--heading-color, #2D2D2A)",
          boxShadow: "2px 2px 0px var(--retro-shadow, #2D2D2A)",
          padding: "4px 8px",
          borderRadius: "6px",
          color: "var(--heading-color, #2D2D2A)",
          fontWeight: "bold",
          position: "absolute",
          bottom: "100%",
          left: "50%",
          marginBottom: "8px",
          whiteSpace: "nowrap",
        }}
      />
      <div
        ref={spriteHostRef}
        style={{
          width: `${CELL_W}px`,
          height: `${CELL_H}px`,
          backgroundImage: "url('/catsprite.webp')",
          backgroundColor: "transparent",
          backgroundSize: `${TOTAL_COLS * 100}% ${TOTAL_ROWS * 100}%`,
          backgroundPosition: "0% 62.5%", // starts on SITTING (row 5 of 8)
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          filter: "drop-shadow(1.5px 2px 0px rgba(0,0,0,0.3))",
        }}
      />
      <style>{`
        @keyframes cat-bounce {
          0% { transform: translate(-50%, -50%) scale(1); }
          30% { transform: translate(-50%, -50%) scale(1.25, 0.8); }
          60% { transform: translate(-50%, -50%) scale(0.9, 1.15); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}