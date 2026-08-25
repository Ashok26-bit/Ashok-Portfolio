import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client;
let clientPromise;

const handleConnectionError = (error) => {
  console.warn(`MongoDB unavailable: ${error.message}`);
  return null;
};

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR.
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect().catch(handleConnectionError);
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect().catch(handleConnectionError);
  }
} else {
  console.warn('⚠️ MONGODB_URI environment variable is not defined.');
}

/**
 * Connect to MongoDB Atlas and return the database instance.
 */
export async function getDatabase(dbName = 'ashok_portfolio') {
  if (!uri) {
    return null;
  }
  const clientInstance = await clientPromise;
  if (!clientInstance) {
    return null;
  }
  return clientInstance.db(dbName);
}

export default clientPromise;
