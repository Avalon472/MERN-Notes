import express from "express";
import { createNote, deleteNote, pullAllNotes, updateNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/", pullAllNotes);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;