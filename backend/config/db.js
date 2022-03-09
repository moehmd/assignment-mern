import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const db = mongoose.connect(process.env.MONGO_URI)
      .then( () => {
        console.log("MongoDB connected");
      });
  } catch (error) {
    console.log("connection to Mongo DB failed");
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
