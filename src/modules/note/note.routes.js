import { Router } from "express";
import * as NC from "./note.controllers.js";

const noteRouter = Router();

noteRouter.get("/profile", NC.profile);
noteRouter.get("/logout", NC.logout);
noteRouter.post("/addNote", NC.addNote);
noteRouter.post("/updateNote", NC.updateNote);
noteRouter.get("/deleteNote/:noteId", NC.deleteNote);

export default noteRouter;