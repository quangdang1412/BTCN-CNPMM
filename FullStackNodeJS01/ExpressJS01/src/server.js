import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import viewEngine from "./config/viewEngine.js";
import routerAPI from "./routes/api.js";
import connectDB from "./config/configdb.js";
import "dotenv/config.js";

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
app.use("/v1/api", routerAPI);
connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Backend Nodejs is runing on the port : " + port);
});
