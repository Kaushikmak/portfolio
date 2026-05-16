"use client";

import Link from "next/link";
import ActivityHeatmap from "../components/ActivityHeatmap";
import "./cooking.css";
import { useState, useEffect } from "react";

export default function CookingPage() {
  const [cookingData, setCookingData] = useState([]);

  // client‑side mock data generation to avoid hydration mismatches
  useEffect(() => {
    const data = [];
    const start = new Date(2026, 0, 1);
    for (let i = 0; i < 180; i++) {
      if (Math.random() < 0.5) {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        data.push({
          date: d.toISOString().split("T")[0],
          count: Math.floor(Math.random() * 3) + 1,
        });
      }
    }
    setCookingData(data);
  }, []);

  const recipes = [
    {
      title: "Protein Pancakes",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=400&q=80",
      desc: "Fluffy pancakes packed with whey protein, perfect for post‑workout fuel."
    },
    {
      title: "Chicken & Veggie Stir‑Fry",
      image: "https://images.unsplash.com/photo-1604908812815-2e5cfbb3f2e5?auto=format&fit=crop&w=400&q=80",
      desc: "Quick stir‑fry with chicken breast, bell peppers, broccoli and a soy‑ginger glaze."
    },
    {
      title: "Avocado Quinoa Salad",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
      desc: "Refreshing salad with quinoa, ripe avocado, cherry tomatoes and lemon vinaigrette."
    }
  ];

  return (
    <>
      <div className="card cooking-page">
        <header className="page-header">
          <Link href="/hobbies" className="back-link">&larr; Back to Offline Mode</Link>
          <h1>Cooking Logs</h1>
          <p className="subtitle">Experimenting in the kitchen &amp; sharing favorite recipes.</p>
        </header>

        <section className="section">
          <h2>2026 Cooking Activity</h2>
          <ActivityHeatmap data={cookingData} theme="cooking" />
        </section>

        <section className="section">
          <h2>Featured Recipes</h2>
          <div className="recipe-grid">
            {recipes.map((r, i) => (
              <div key={i} className="recipe-card">
                <img src={r.image} alt={r.title} className="recipe-img" loading="lazy" />
                <h3 className="recipe-title">{r.title}</h3>
                <p className="recipe-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
