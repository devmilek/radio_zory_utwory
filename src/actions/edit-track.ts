"use server";

import { db } from "@/db";
import { tracks } from "@/db/schema";
import { createTrackSchema, CreateTrackSchema } from "@/schemas/track-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const editTrack = async (data: CreateTrackSchema, id: number) => {
  const validatedData = createTrackSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      status: 400,
      message: "Błędne dane wejściowe",
    };
  }

  const trackData = validatedData.data;

  try {
    await db
      .update(tracks)
      .set({
        ...trackData,
      })
      .where(eq(tracks.id, id));

    revalidatePath("/");

    return {
      status: 201,
      message: "Utwórz został zaktualizowany",
    };
  } catch (error) {
    console.error("Wystąpił błąd podczas aktualizacji utworu:", error);
    return {
      status: 500,
      message: "Wystąpił błąd podczas aktualizacji utworu",
    };
  }
};
