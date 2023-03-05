import express from "express";
import { songsHandler } from "./handler";
import { ValidationError } from "yup";
import { createSongSchema, pathIdSchema, updateSongSchema } from "./schema";

const router = express.Router();

/**
 * @swagger
 * /songs:
 *    get:
 *      summary: Retrieve a list of songs
 *      description: Retrieve a list of songs stored in memory
 *      responses:
 *        200:
 *          description: A list of songs
 */
router.get("/songs", songsHandler.getSongs);

/**
 * @swagger
 * /songs/{id}:
 *    get:
 *      summary: Retrieve a song
 *      description: Retrieve a song by specifying its uuid as a path parameter
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the song to retrieve.
 *         schema:
 *           type: string
 *      responses:
 *        200:
 *          description: A song
 *        404:
 *          description: Song not found
 *        422:
 *          description: A list of request validation errors
 */
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

/**
 * @swagger
 * /songs:
 *    put:
 *      summary: Update a song
 *      description: Update the name or description of a song
 *      parameters:
 *        - in: body
 *          name: song
 *          description: The song to update
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              description:
 *                type: string
 *      responses:
 *        200:
 *          description: The updated song
 *        404:
 *          description: Song not found
 *        422:
 *          description: A list of request validation errors
 *        500:
 *          description: Internal server error
 */
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

/**
 * @swagger
 * /songs:
 *    post:
 *      summary: Create a song
 *      description: Create a song by specifying name and description
 *      parameters:
 *        - in: body
 *          name: song
 *          description: The song to create
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *      responses:
 *        201:
 *          description: The created song
 *        422:
 *          description: A list of request validation errors
 *        500:
 *          description: Internal server error
 */
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

/**
 * @swagger
 * /songs/{id}:
 *    delete:
 *      summary: Delete a song
 *      description: Delete a song by specifying its id
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the song to delete
 *          schema:
 *           type: string
 *      responses:
 *        204:
 *          description: The deleted song
 *        422:
 *          description: A list of request validation errors
 *        500:
 *          description: Internal server error
 *        404:
 *          description: Song not found
 */
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
