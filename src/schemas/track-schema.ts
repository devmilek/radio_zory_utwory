import { z } from "zod";

// Regex dla numerów katalogowych (a-z, 0-9)
const catalogNumberRegex = /^[a-z0-9]+$/i;

// Regex dla czasu trwania w formacie mm:ss
const durationRegex = /^([0-9]+):([0-5][0-9])$/;

export const createTrackSchema = z.object({
  title: z.string().min(1, "Tytuł utworu jest wymagany").max(255),
  artist: z.string().min(1, "Wykonawca jest wymagany").max(255),
  albumName: z.string().max(255).optional(),
  lyricist: z.string().max(255).optional(),
  composer: z.string().max(255).optional(),
  duration: z
    .string()
    .regex(durationRegex, "Czas trwania musi być w formacie mm:ss"),
  publisher: z.string().max(255).optional(),
  releaseYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
  phonogramCatalogNumber: z
    .string()
    .regex(
      catalogNumberRegex,
      "Numer katalogowy może zawierać tylko litery i cyfry"
    )
    .max(50)
    .optional(),
  trackCatalogNumber: z
    .string()
    .regex(
      catalogNumberRegex,
      "Numer katalogowy może zawierać tylko litery i cyfry"
    )
    .max(50)
    .optional(),
});

export type CreateTrackSchema = z.infer<typeof createTrackSchema>;

export const updateTrackSchema = createTrackSchema.extend({
  id: z.number().int(),
});

export type UpdateTrackSchema = z.infer<typeof updateTrackSchema>;
