import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const eventId = req.query.eventId;
  let client: MongoClient;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { name, email, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      client.close();
      return;
    }

    console.log(name, email, text);
    const newComment = {
      name,
      email,
      text,
      eventId,
      id: "",
    };

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment.id = result.insertedId.toString();

      res.status(201).json({ message: "Added comment!", comment: newComment });
    } catch (error) {
      res.status(422).json({ message: "Inserting comment invalid" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      const documentsById = documents.filter(
        (document) => document.eventId === eventId,
      );

      res.status(200).json({ comments: documentsById });
    } catch (error) {
      res.status(422).json({ message: "Getting comments failed" });
    }
  }

  client.close();
};

export default handler;
