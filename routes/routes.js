import express from "express";
import { index } from "../controllers/homeControlle.js";

const route = express.Router();

route.get("/", index);

route.get("/health", (req, res) => {
  res.send("Healthy Server");
});

export default route;
