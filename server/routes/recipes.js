// import express from 'express'
// import { auth } from '../middleware/auth.js'
// import { createRecipe, getAll, getOne, toggleSave, deleteRecipe } from '../controllers/recipeController.js'
// const router = express.Router()
// router.get('/', getAll)
// router.get('/:id', getOne)
// router.post('/', auth, createRecipe)
// router.post('/:id/save', auth, toggleSave)
// router.delete('/:id', auth, deleteRecipe)
// export default router


import express from 'express'
import { auth } from '../middleware/auth.js'
import {
  createRecipe,
  getAll,
  getOne,
  toggleSave,
  deleteRecipe
} from '../controllers/recipeController.js'

const router = express.Router()

// 🧑‍🍳 Create new recipe (requires auth)
router.post('/', auth, createRecipe)

// 🍽️ Get all recipes
router.get('/', getAll)

// 🔍 Get one recipe by ID
router.get('/:id', getOne)

// ⭐ Save / unsave recipe (toggle favorite)
router.post('/:id/save', auth, toggleSave)

// 🗑️ Delete recipe
router.delete('/:id', auth, deleteRecipe)

router.post('/:id/save', auth, toggleSave)

// ✅ New route: Get all recipes saved by the logged-in user
router.get('/saved/all', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ savedBy: req.user._id }).populate('author', 'name avatar')
    res.json(recipes)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})
export default router
