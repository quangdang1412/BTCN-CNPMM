import path from "path";
import express, { Application } from "express";

const viewEngine = (app: Application): void => {
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "ejs");
  app.use(express.static(path.join(__dirname, "..", "public")));
};

export default viewEngine;
