// import Recipe from "../models/Recipe.js";
// import User from "../models/User.js";

// export const createRecipe = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       ingredients,
//       steps,
//       cuisine,
//       difficulty,
//       prepTime,
//       coverImage,
//       tags,
//     } = req.body;
//     const recipe = new Recipe({
//       title,
//       description,
//       ingredients,
//       steps,
//       cuisine,
//       difficulty,
//       prepTime,
//       coverImage,
//       tags,
//       author: req.user._id,
//     });
//     await recipe.save();
//     res.json(recipe);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getAll = async (req, res) => {
//   try {
//     const { q, cuisine, tag } = req.query;
//     const filter = {};
//     if (q) filter.title = { $regex: q, $options: "i" };
//     if (cuisine) filter.cuisine = cuisine;
//     if (tag) filter.tags = tag;
//     const recipes = await Recipe.find(filter)
//       .populate("author", "name avatar bio")
//       .sort({ createdAt: -1 });
//     res.json(recipes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getOne = async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id).populate(
//       "author",
//       "name avatar bio"
//     );
//     if (!recipe) return res.status(404).json({ message: "Recipe not found" });
//     res.json(recipe);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const toggleSave = async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     const user = await User.findById(req.user._id);
//     if (!recipe || !user) return res.status(404).json({ message: "Not found" });
//     const savedIndex = user.favorites.findIndex(
//       (id) => id.toString() === recipe._id.toString()
//     );
//     if (savedIndex === -1) {
//       user.favorites.push(recipe._id);
//       recipe.savedBy.push(user._id);
//     } else {
//       user.favorites.splice(savedIndex, 1);
//       recipe.savedBy = recipe.savedBy.filter(
//         (id) => id.toString() !== user._id.toString()
//       );
//     }
//     await user.save();
//     await recipe.save();
//     res.json({ favorites: user.favorites });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const deleteRecipe = async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     if (!recipe) return res.status(404).json({ message: "Not found" });
//     if (recipe.author.toString() !== req.user._id.toString())
//       return res.status(403).json({ message: "Not allowed" });
//     await recipe.remove();
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


import Recipe from '../models/Recipe.js'
import User from '../models/User.js'

// 🥗 Create new recipe
export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, cuisine, difficulty, prepTime, coverImage, tags } = req.body

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      cuisine,
      difficulty,
      prepTime,
      coverImage,
      tags,
      author: req.user._id
    })

    await recipe.save()
    res.json(recipe)
  } catch (err) {
    console.error('Create Recipe Error:', err)
    res.status(500).json({ message: 'Server error creating recipe' })
  }
}

// 📜 Get all recipes
export const getAll = async (req, res) => {
  try {
    const { q, cuisine, tag } = req.query
    const filter = {}
    if (q) filter.title = { $regex: q, $options: 'i' }
    if (cuisine) filter.cuisine = cuisine
    if (tag) filter.tags = tag

    const recipes = await Recipe.find(filter)
      .populate('author', 'name avatar bio')
      .sort({ createdAt: -1 })

    res.json(recipes)
  } catch (err) {
    console.error('Get All Recipes Error:', err)
    res.status(500).json({ message: 'Server error fetching recipes' })
  }
}

// 🍲 Get one recipe
export const getOne = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'name avatar bio')
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' })
    res.json(recipe)
  } catch (err) {
    console.error('Get One Recipe Error:', err)
    res.status(500).json({ message: 'Server error fetching recipe' })
  }
}

// ⭐ Toggle save
export const toggleSave = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    const user = await User.findById(req.user._id)
    if (!recipe || !user) return res.status(404).json({ message: 'Not found' })

    const savedIndex = user.favorites.findIndex(id => id.toString() === recipe._id.toString())

    if (savedIndex === -1) {
      user.favorites.push(recipe._id)
      recipe.savedBy.push(user._id)
    } else {
      user.favorites.splice(savedIndex, 1)
      recipe.savedBy = recipe.savedBy.filter(id => id.toString() !== user._id.toString())
    }

    await user.save()
    await recipe.save()
    res.json({ favorites: user.favorites })
  } catch (err) {
    console.error('Toggle Save Error:', err)
    res.status(500).json({ message: 'Server error saving recipe' })
  }
}

// 🗑️ Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' })

    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed to delete this recipe' })
    }

    await recipe.deleteOne()
    res.json({ message: 'Recipe deleted successfully' })
  } catch (err) {
    console.error('Delete Recipe Error:', err)
    res.status(500).json({ message: 'Server error deleting recipe' })
  }
}

