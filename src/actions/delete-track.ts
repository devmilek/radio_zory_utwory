"use server";

import { db } from "@/db";
import { tracks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteTrack = async (id: number) => {
  try {
    await db.delete(tracks).where(eq(tracks.id, id));

    revalidatePath("/");

    return {
      status: 200,
      message: "Utwór został pomyślnie usunięty.",
    };
  } catch (e) {
    console.error("Error deleting track:", e);
    return {
      status: 500,
      message: "Nie udało się usunąć utworu.",
    };
  }
};
