"use client";

import Link from "next/link";
import Image from "next/image";
import "./cooking.css";

export default function CookingPage() {
  const recipes = [
    {
      title: "Protein Pancakes",
      image: "/assets/cooking/protein-pancakes.svg",
      desc: "Fluffy pancakes packed with whey protein, perfect for post-workout fuel."
    },
    {
      title: "Chicken & Veggie Stir‑Fry",
      image: "/assets/cooking/chicken-stir-fry.svg",
      desc: "Quick stir-fry with chicken breast, bell peppers, broccoli and a soy-ginger glaze."
    },
    {
      title: "Avocado Quinoa Salad",
      image: "/assets/cooking/avocado-quinoa.svg",
      desc: "Refreshing salad with quinoa, ripe avocado, cherry tomatoes and lemon vinaigrette."
    }
  ];

  return (
    <>
      <div className="card cooking-page">
        <header className="page-header cooking-hero">
          <Link href="/hobbies" className="back-link">&larr; Back to Offline Mode</Link>
          <h1>Cooking Logs</h1>
          <p className="subtitle">Experimenting in the kitchen, meal-prepping, and collecting recipes I actually repeat.</p>
          <div className="hero-chips">
            <span>High Protein</span>
            <span>Quick Meals</span>
            <span>Budget Friendly</span>
          </div>
        </header>

        <section className="section">
          <h2>Kitchen Philosophy</h2>
          <div className="kitchen-note">
            <p>I keep meals simple: one protein source, one fiber source, one flavor boost.</p>
            <p>Most dishes are 20-30 minutes and built for consistency over perfection.</p>
          </div>
        </section>

        <section className="section">
          <h2>Featured Recipes</h2>
          <div className="recipe-grid">
            {recipes.map((r, i) => (
              <div key={i} className="recipe-card">
                <Image src={r.image} alt={r.title} className="recipe-img" width={1200} height={900} />
                <h3 className="recipe-title">{r.title}</h3>
                <p className="recipe-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Pantry Staples</h2>
          <div className="staples-grid">
            <div className="staple-card">
              <h3>Base</h3>
              <p>Oats, rice, quinoa, whole wheat wraps</p>
            </div>
            <div className="staple-card">
              <h3>Protein</h3>
              <p>Eggs, chicken breast, Greek yogurt, paneer</p>
            </div>
            <div className="staple-card">
              <h3>Flavor</h3>
              <p>Garlic, chili flakes, lemon, soy sauce</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
