import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/minhaBase';
export const client = new MongoClient(uri);

export async function getUserCollection() {
  await client.connect();
  return client.db().collection('usuarios');
}
