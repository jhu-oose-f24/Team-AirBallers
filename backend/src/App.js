import cors from "cors";
import express from "express";
import helmet from "helmet";
import GenerateGarmentDescription from "./GenerateGarmentDescirption.js";
import generateImage from "./flux.js";

const app = express();

app.use(cors({ credentials: true }));
app.use(helmet());
app.use(express.json());

app.post("/prompt", async (req, res, next) => {
  const description = await GenerateGarmentDescription(req.body.prompt);
  const stuff = await generateImage(description);
  res.status(200).json({ data: stuff.images[0] });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
