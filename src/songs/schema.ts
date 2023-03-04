import * as yup from "yup";

export interface Song {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface createSongProps {
  name: string;
  description: string;
}

export interface updateSongProps {
  id: string;
  name?: string;
  description?: string;
}

export const updateSongSchema = yup.object({
  id: yup.string().uuid().required(),
  name: yup.string().optional(),
  description: yup.string().optional(),
});

export const createSongSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
});

export const pathIdSchema = yup.object().shape({
  id: yup.string().uuid().required(),
});
