import React, { useState } from "react";
import API, { setToken } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [prepTime, setPrepTime] = useState("20 mins");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("ff_token");

  const submit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Login to create recipe");
    try {
      setToken(token);
      const payload = {
        title,
        description: desc,
        ingredients: ingredients
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        steps: steps
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        cuisine,
        difficulty,
        prepTime,
        coverImage: image,
        tags: [],
      };
      await API.post(import.meta.env.VITE_API_URL +'/recipes', payload);
      toast.success("Recipe created");
      navigate("/recipes");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Recipe</h2>
      <form onSubmit={submit} className="grid gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="px-4 py-3 rounded-lg bg-white/3"
        />
        <input
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Cuisine"
          className="px-4 py-3 rounded-lg bg-white/3"
        />
        <div className="grid grid-cols-2 gap-3">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white/3"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <input
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="Prep time"
            className="px-4 py-3 rounded-lg bg-white/3"
          />
        </div>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Short description"
          className="px-4 py-3 rounded-lg bg-white/3"
        />
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients (one per line)"
          className="px-4 py-3 rounded-lg bg-white/3"
        />
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="Steps (one per line)"
          className="px-4 py-3 rounded-lg bg-white/3"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Cover image URL"
          className="px-4 py-3 rounded-lg bg-white/3"
        />
        <button className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-ff-rose to-ff-gold text-black font-semibold">
          Create
        </button>
      </form>
    </div>
  );
}
