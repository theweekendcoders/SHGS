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
