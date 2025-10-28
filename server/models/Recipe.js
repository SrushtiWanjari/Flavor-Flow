import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ingredients: [String],
  steps: [String],
  cuisine: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  difficulty: { type: String, enum: ['Easy','Medium','Hard'], default: 'Easy' },
  prepTime: String,
  coverImage: String,
  tags: [String]
}, { timestamps: true })

export default mongoose.model('Recipe', recipeSchema)
