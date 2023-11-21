import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database.
 *
 * @throws {Error} If the MongoDB URI is not defined or if there is an error connecting to the database.
 */
export const dbConnection = async () => {
  try {
    // Retrieve the MongoDB URI from environment variables
    const uri = process.env.MONGODB_URI;

    // Check if the URI is defined
    if (!uri) {
      throw new Error("MongoDB URI is not defined");
    }

    // Attempt to connect to the MongoDB database
    await mongoose.connect(uri);

    console.log("Database online");
  } catch (error) {
    console.log(error);
    throw new Error("Error when starting the database");
  }
};
