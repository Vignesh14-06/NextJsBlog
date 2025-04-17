import mongoose from "mongoose";

// const connectMongo = async()=>  mongoose.connect(process.env.MONGO_DB)

// import mongoose from "mongoose";

let isConnected = false; // Track the connection state globally

const connectMongo = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true; // Set the connection state to true
    console.log(`MongoDB connected successfully: ${db.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

// export default connectMongo;


export default connectMongo