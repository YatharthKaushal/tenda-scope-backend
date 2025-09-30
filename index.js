import express, { json } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(json());

app.post("/data", (req, res) => {
  console.log("Received POST request to /data");
  console.log("Request body:", req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
