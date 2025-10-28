// import mongoose from 'mongoose'

// export const connectDB = async (mongoURI) => {
//   try {
//     await mongoose.connect(mongoURI)
//     console.log('MongoDB connected')
//   } catch (err) {
//     console.error('MongoDB connection error:', err.message)
//     process.exit(1)
//   }
// }

import mongoose from 'mongoose';

export const connectDB = async (url) => {
  try {
    if (!url) {
      console.error('❌ MongoDB URL missing!');
      process.exit(1);
    }
    await mongoose.connect(url);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

