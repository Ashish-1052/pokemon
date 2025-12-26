import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});