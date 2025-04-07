import express from "express";
import { Request, Response } from "express";
// Route imports
import goalsRoutes from "./v1/business_progress/goals/goals";

// https://medium.com/@holasoymalva/how-to-build-a-rest-api-with-node-js-and-typescript-3491ddd19f95
const app = express();

app.use(express.json());

app.get("/api/v1/health", (_: Request, res: Response) => {
  res.json({ success: true });
});

app.post("/api/v1/echo", (req: Request, res: Response) => {
  res.json(req.body);
});

// Route usage
app.use("/", goalsRoutes);

export default app;
