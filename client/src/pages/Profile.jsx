import React, { useEffect, useState } from "react";
import API, { setToken } from "../api";
import { toast } from "react-toastify";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("ff_token");

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        toast.error("You must be logged in to view your profile");
        return;
      }

      setToken(token);

      try {
        const userRes = await API.get("/auth/me");
        setUser(userRes.data);

        const recipeRes = await API.get("/recipes/saved");
        setFavorites(recipeRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your profile data");
      }
    };

    loadProfile();
  }, [token]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2c] via-[#23263b] to-[#1b1e31] text-white py-10 px-6">
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <div className="inline-block bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-transparent bg-clip-text animate-pulse text-4xl font-extrabold mb-2">
          Welcome back, {user.name}! 👩‍🍳
        </div>
        <p className="text-slate-300 max-w-2xl mx-auto text-base">
          {user.bio || "Let's make something delicious today!"}
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-12 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={
              user.avatar ||
              "https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
            }
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-white/20 shadow-lg"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-white">{user.name}</h3>
            <p className="text-slate-300 mt-1 text-sm">{user.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs border border-pink-500/30">
                Food Blogger
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs border border-emerald-500/30">
                Recipe Creator
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
          🌟 Your Saved Recipes
        </h2>

        {favorites.length === 0 ? (
          <p className="text-slate-400 text-center italic">
            You haven’t saved any recipes yet. Explore and add some favorites!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((r) => (
              <div
                key={r._id}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-4 shadow-lg hover:shadow-2xl 
                           hover:scale-[1.03] transition transform backdrop-blur-md"
              >
                <img
                  src={
                    r.coverImage ||
                    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60"
                  }
                  alt={r.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h4 className="font-semibold text-lg text-white mb-1">
                  {r.title}
                </h4>
                <p className="text-sm text-slate-300 line-clamp-2">
                  {r.description}
                </p>
                <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
                  <span>{r.cuisine}</span>
                  <span>⏱ {r.prepTime}</span>
                </div>
                <p className="mt-2 text-xs italic text-slate-500">
                  By {r.author?.name || "Chef"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
