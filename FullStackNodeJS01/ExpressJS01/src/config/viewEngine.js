import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (app) => {
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "ejs");
  app.use(express.static(path.join(__dirname, "..", "public")));
};
