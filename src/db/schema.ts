import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tracks = sqliteTable("tracks_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text("tytul_utworu").notNull(),
  artist: text("wykonawca").notNull(),
  albumName: text("nazwa_albumu"),
  lyricist: text("autor_tekstu"),
  composer: text("kompozytor_autor_muzyki"),
  duration: text("czas_trwania").notNull(), // format "mm:ss"
  publisher: text("wydawca"),
  releaseYear: int("rok_wydania"),
  phonogramCatalogNumber: text("nr_katalogowy_fonogramu"), // varchar a-z0-9
  trackCatalogNumber: text("nr_katalogowy_utworu"), // varchar a-z0-9
});

export type Track = typeof tracks.$inferSelect;
export type InsertTrack = typeof tracks.$inferInsert;
