import React, { useEffect, useState } from "react";
import API from "../api";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await API.get("/recipes");
      setFeatured(res.data.slice(0, 4));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-ff-rose via-ff-indigo to-ff-gold">
            FlavorFlow
          </h1>
          <p className="text-slate-300 max-w-xl">
            A premium home for recipes — share your signature dishes, explore
            curated collections, and save what you love.
          </p>
          <div className="flex gap-4">
            <Link
              to="/recipes"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-ff-rose to-ff-gold text-black font-semibold shadow-lg"
            >
              Explore Recipes
            </Link>
            <Link
              to="/create"
              className="px-6 py-3 rounded-lg border border-white/6 text-slate-200 hover:bg-white/3 transition"
            >
              Add Recipe
            </Link>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
            alt="hero"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Recipes</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {featured.map((r) => (
            <RecipeCard key={r._id} recipe={r} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#061021]/50 via-[#0b1320]/40 to-[#071026]/30 rounded-2xl p-8">
        <h3 className="text-xl font-semibold mb-2">Why FlavorFlow?</h3>
        <p className="text-slate-300 mb-4">
          We focus on simplicity, beautiful design, and community — perfect for
          sharing family recipes and discovering new flavors.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/3 rounded-xl">
            <h4 className="font-semibold">Curated Collections</h4>
            <p className="text-sm text-slate-300">
              Hand-picked recipes to inspire your next meal.
            </p>
          </div>
          <div className="p-4 bg-white/3 rounded-xl">
            <h4 className="font-semibold">Save & Organize</h4>
            <p className="text-sm text-slate-300">
              Keep favorites handy and accessible.
            </p>
          </div>
          <div className="p-4 bg-white/3 rounded-xl">
            <h4 className="font-semibold">Share Easily</h4>
            <p className="text-sm text-slate-300">
              A beautiful place to present your creations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
