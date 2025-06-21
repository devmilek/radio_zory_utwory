import { CreateTrackButton } from "@/components/create-track-button";
import { TracksDataTable } from "@/components/tracks-table";
import { loadSearchParams } from "@/components/tracks-table/params";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { tracks } from "@/db/schema";
import { AnyColumn, asc, desc } from "drizzle-orm";
import { SearchParams } from "nuqs";

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page, perPage, sort } = await loadSearchParams(searchParams);

  const orderBy =
    sort?.map((sortItem) => {
      const column = tracks[sortItem.id as keyof typeof tracks];
      return sortItem.desc
        ? desc(column as AnyColumn)
        : asc(column as AnyColumn);
    }) || [];

  const data = await db.query.tracks.findMany({
    offset: (page - 1) * perPage,
    limit: perPage,
    orderBy,
  });

  const totalCount = await db.$count(tracks);

  const pageCount = Math.ceil(totalCount / perPage);

  return (
    <main className="container mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold">Radio Żory - Utwory</h1>
          <Badge>{totalCount} utworów</Badge>
        </div>
        <CreateTrackButton />
      </header>
      <TracksDataTable data={data} pageCount={pageCount} />
    </main>
  );
}
