// lib/database.js
import { MongoClient } from 'mongodb';

let cachedClient;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  let client;
  
  if (!client) {
      client = await MongoClient.connect(process.env.MONGODB_URI);
  }

  cachedClient = client;
  return client;
}

export async function disconnectFromDatabase() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
  }
}


// import { MongoClient } from 'mongodb';

// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }

// const uri = process.env.MONGODB_URI;

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;