import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { termsOfServiceContent } from "./utils/termsOfService.js";
import { privacyPolicyContent } from "./utils/privacyPolicy.js";

import routerUser from "./routes/user_router.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use(routerUser);

app.get("/", (req, res) => {
  res.send("Welcome to the TikTok analytics API");
});

app.get("/privacy-policy", (req, res) => {
  res.send(privacyPolicyContent);
});

app.get("/terms-of-service", (req, res) => {
  res.send(termsOfServiceContent);
});

// Starting Express Server
const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Backend Server started on http://localhost:${port}`)
);
