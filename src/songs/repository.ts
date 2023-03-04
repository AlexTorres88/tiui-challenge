import { v4 as uuidv4 } from "uuid";
import { createSongProps, Song, updateSongProps } from "./schema";

class SongsSingleton {
  private static _instance: SongsSingleton = new SongsSingleton();
  private _songs: Song[] = [];

  private constructor() {
    if (SongsSingleton._instance) {
      throw new Error(
        "Error: Instantiation failed: Use SingletonClass.getInstance() instead of new."
      );
    }
    SongsSingleton._instance = this;
  }

  public static getInstance(): SongsSingleton {
    return SongsSingleton._instance;
  }

  public createSong(song: Song): void {
    this._songs.push(song);
  }

  public findSong(id: string): Song | undefined {
    return this._songs.find((song) => song.id === id);
  }

  public deleteSong(id: string): Song[] {
    const song = this._songs.find((song) => song.id === id);

    if (!song) return [];

    return this._songs.splice(this._songs.indexOf(song), 1);
  }

  public getSong(id: string): Song | undefined {
    return this._songs.find((song) => song.id === id);
  }

  public getSongs(): Song[] {
    return this._songs;
  }
}

const createSong = async ({ name, description }: createSongProps) => {
  const now = new Date();

  const song = {
    id: uuidv4(),
    name: name,
    description: description,
    createdAt: now,
    updatedAt: now,
  };

  SongsSingleton.getInstance().createSong(song);

  return song;
};

const updateSong = async ({ id, name, description }: updateSongProps) => {
  const song = SongsSingleton.getInstance().findSong(id);

  if (!song) return null;

  if (name) {
    song.name = name;
  }

  if (description) {
    song.description = description;
  }

  song.updatedAt = new Date();

  return song;
};

const deleteSong = async (id: string) => {
  return SongsSingleton.getInstance().deleteSong(id);
};
const getSong = async (id: string) => {
  return SongsSingleton.getInstance().getSong(id);
};
const getSongs = async () => {
  return SongsSingleton.getInstance().getSongs();
};

export const songsRepository = {
  createSong,
  updateSong,
  deleteSong,
  getSong,
  getSongs,
};
