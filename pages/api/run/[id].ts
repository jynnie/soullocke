import { NextApiRequest, NextApiResponse } from "next";
import db from "lib/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  let runId: string;
  if (Array.isArray(id)) runId = id[0];
  else runId = id;

  const snapshot = await db.ref(runId).once("value");
  const value = snapshot.val();

  if (value) {
    console.log("Succesfully retrieved run data", value);
    res.status(200).json(value);
  } else {
    console.error(new Error("No such run with this id"));
    res.redirect(404, "/");
  }
  // res.json({ name: "John Doe" });
};
