import { setServers } from 'node:dns/promises'; setServers(["1.1.1.1", "8.8.8.8"]);
import express from "express";
import dotenv from "dotenv";
import methodOverride from "method-override";
import morgan from "morgan";
import expressLayouts from "express-ejs-layouts";

import connectDB from "./config/db.js";
import countryRoutes from "./routes/countryRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.set("view engine", "ejs");

app.use(expressLayouts);

app.set("layout", "./layouts/main")

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(morgan("dev"));

app.use(countryRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});