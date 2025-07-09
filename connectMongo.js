// connectMongo.js
import mongoose from 'mongoose';

dotenv.config();

// Disable strict query warnings
mongoose.set('strictQuery', false);

/**
 * Establishes a connection to MongoDB using MONGO_URI from environment variables.
 * Logs success or failure to the console.
 */
export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};
