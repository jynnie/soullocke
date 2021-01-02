import db from "lib/firebase";

export default (req, res) => {
  res.statusCode = 200;
  res.end("hello");
  // res.json({ name: "John Doe" });
};
