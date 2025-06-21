"use server";

import { db } from "@/db";
import { tracks } from "@/db/schema";
import { createTrackSchema, CreateTrackSchema } from "@/schemas/track-schema";
import { revalidatePath } from "next/cache";

export const createTrack = async (data: CreateTrackSchema) => {
  const validatedData = createTrackSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      status: 400,
      message: "Błędne dane wejściowe",
    };
  }

  const trackData = validatedData.data;

  try {
    await db.insert(tracks).values(trackData);

    revalidatePath("/");

    return {
      status: 201,
      message: "Utwór został pomyślnie dodany",
    };
  } catch (error) {
    console.error("Błąd podczas dodawania utworu:", error);
    return {
      status: 500,
      message: "Wystąpił błąd podczas dodawania utworu",
    };
  }
};
