import express, { json } from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
const dataFilePath = path.join(process.cwd(), "data.json");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(json());

app.post("/data", (req, res) => {
  console.log("Received POST request to /data");
  console.log("Request body (full structure):");
  console.log(JSON.stringify(req.body, null, 2));

  // Overwrite data.json with the new data
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(req.body, null, 2));
  } catch (err) {
    console.error("Error writing to data.json:", err);
    return res.status(500).send("Error writing data file");
  }

  res.sendStatus(200);
});

app.get("/data", (req, res) => {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, "utf-8");
      const data = JSON.parse(fileContent);
      res.json(data);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.error("Error reading data.json:", err);
    res.status(500).send("Error reading data file");
  }
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
