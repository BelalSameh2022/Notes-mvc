import { config } from "dotenv";
config();
import express from "express";
import path from "path";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dbConnection from "./database/connection.js";
import userRouter from "./src/modules/user/user.routes.js";
import noteRouter from "./src/modules/note/note.routes.js";

const app = express();
const port = process.env.PORT || 3001;

app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "ejs");

app.use(cors())
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.ONLINE_MONGO_URI,
      collectionName: "sessions",
    }),
  })
);

dbConnection();

app.use(userRouter);
app.use(noteRouter);
app.use("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
