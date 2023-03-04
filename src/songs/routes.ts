import express from "express";
import { songsHandler } from "./handler";
import { ValidationError } from "yup";
import { createSongSchema, pathIdSchema, updateSongSchema } from "./schema";

const router = express.Router();

router.get("/songs", songsHandler.getSongs);
router.get("/songs/:id", (req, res, next) => {
  // validate uuid in path
  try {
    pathIdSchema.validateSync({ id: req.params.id }, { abortEarly: false });
  } catch (e) {
    const error = e as ValidationError;
    return res.status(422).json({ errors: error.errors });
  }

  return songsHandler.getSong(req, res, next);
});
router.put("/songs", (req, res, next) => {
  const body = req.body;

  try {
    updateSongSchema.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (e) {
    const error = e as ValidationError;
    return res.status(422).json({ errors: error.errors });
  }

  return songsHandler.updateSong(req, res, next);
});
router.post("/songs", (req, res, next) => {
  // validate body schema
  try {
    createSongSchema.validateSync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (e) {
    const error = e as ValidationError;
    return res.status(422).json({ errors: error.errors });
  }

  return songsHandler.createSong(req, res, next);
});
router.delete("/songs/:id", (req, res, next) => {
  // validate uuid in path
  try {
    pathIdSchema.validateSync({ id: req.params.id }, { abortEarly: false });
  } catch (e) {
    const error = e as ValidationError;
    return res.status(422).json({ errors: error.errors });
  }

  return songsHandler.deleteSong(req, res, next);
});

export default router;
