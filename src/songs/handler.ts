import { Request, Response, NextFunction } from "express";
import { songsService } from "./service";

const createSong = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  let song = {};
  try {
    song = await songsService.createSong(body);
  } catch (e) {
    return res.status(500).json();
  }

  return res.status(201).json(song);
};
const updateSong = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  let song = {} as any;

  try {
    song = await songsService.updateSong(body);
  } catch (e) {
    return res.status(500).json();
  }

  if (!song) return res.status(404).json();

  return res.status(200).json(song);
};
const deleteSong = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  let song = [];
  try {
    song = await songsService.deleteSong(id);
  } catch (e) {
    return res.status(500).json();
  }

  if (song.length === 0) return res.status(404).json();

  return res.status(204).json();
};
const getSong = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  let song = {} as any;
  try {
    song = await songsService.getSong(id);
  } catch (e) {
    return res.status(500).json();
  }

  if (song === undefined) {
    return res.status(404).json();
  }

  return res.status(200).json(song);
};
const getSongs = async (req: Request, res: Response, next: NextFunction) => {
  let songs = [];
  try {
    songs = await songsService.getSongs();
  } catch (e) {
    return res.status(500).json();
  }
  return res.status(200).json(songs);
};

export const songsHandler = {
  createSong,
  updateSong,
  deleteSong,
  getSong,
  getSongs,
};
