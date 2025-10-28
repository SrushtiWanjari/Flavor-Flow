import React from "react";
import API, { setToken } from "../api";
import { toast } from "react-toastify";

export default function RecipeCard({ recipe, onSaved, onDeleted }) {
  const token = localStorage.getItem("ff_token");

  const handleSave = async () => {
    try {
      setToken(token);
      const res = await API.post(`/recipes/${recipe._id}/save`);
      toast.success("Recipe saved / unsaved successfully!");
      if (onSaved) onSaved(res.data.favorites);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error saving recipe");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${recipe.title}"?`))
      return;
    try {
      setToken(token);
      await API.delete(`/recipes/${recipe._id}`);
      toast.success("Recipe deleted successfully!");
      if (onDeleted) onDeleted(recipe._id); // callback to update UI
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error deleting recipe");
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-xl 
                    hover:scale-[1.02] transition transform backdrop-blur-md"
    >
      <div className="flex gap-4">
        <img
          src={
            recipe.coverImage ||
            "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=400&q=60"
          }
          alt=""
          className="w-36 h-24 object-cover rounded-lg shadow-inner"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white">{recipe.title}</h3>
          <p className="text-sm text-slate-300 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
            <span>{recipe.cuisine}</span>
            <span>•</span>
            <span>{recipe.difficulty}</span>
            <span>•</span>
            <span>{recipe.prepTime}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-slate-300">
          By {recipe.author?.name || "Chef"}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 
                       hover:bg-emerald-500/20 transition"
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 
                       hover:bg-rose-500/20 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
