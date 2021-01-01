import db from "lib/firebase";

export default (req, res) => {
  res.statusCode = 200;
  db.ref("runs");
  // res.json({ name: "John Doe" });
};
