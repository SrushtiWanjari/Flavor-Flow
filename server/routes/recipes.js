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


router.post('/', auth, createRecipe)

router.get('/', getAll)


router.get('/:id', getOne)


router.post('/:id/save', auth, toggleSave)


router.delete('/:id', auth, deleteRecipe)

router.post('/:id/save', auth, toggleSave)


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
