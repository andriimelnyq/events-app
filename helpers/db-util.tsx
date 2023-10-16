import { MongoClient, SortDirection } from "mongodb";

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.8yxbn87.mongodb.net/?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
  const client = await MongoClient.connect(connectionString);

  return client;
};

export const insertDocument = async (
  client: MongoClient,
  collection: string,
  document: { email: string },
) => {
  const db = client.db("events");
  return await db.collection(collection).insertOne(document);
};

export const getAllDocuments = async (
  client: MongoClient,
  collection: string,
  sort: { [key: string]: SortDirection },
) => {
  const db = client.db("events");
  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
};
