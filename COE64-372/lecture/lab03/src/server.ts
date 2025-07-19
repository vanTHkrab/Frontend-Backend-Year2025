import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import router from "./routes/user.route";

dotenv.config();
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "8080", 10);

app.use(express.json());
app.use((req: Request, res: Response, next: () => void) => {
    console.log(`${req.method} request for '${req.url} at ${new Date().toISOString()}`);
    next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/users", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});