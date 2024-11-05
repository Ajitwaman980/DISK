import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/DiskRentalSystem", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection established locally");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;
