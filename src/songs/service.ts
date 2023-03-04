import { songsRepository } from "./repository";
import { createSongProps, updateSongProps } from "./schema";

const createSong = async (body: createSongProps) => {
  return await songsRepository.createSong(body);
};
const updateSong = async (body: updateSongProps) => {
  return await songsRepository.updateSong(body);
};
const deleteSong = async (id: string) => {
  return await songsRepository.deleteSong(id);
};
const getSong = async (id: string) => {
  return await songsRepository.getSong(id);
};
const getSongs = async () => {
  return await songsRepository.getSongs();
};

export const songsService = {
  createSong,
  updateSong,
  deleteSong,
  getSong,
  getSongs,
};
