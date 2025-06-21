import { Track } from "@/db/schema";

import { Badge } from "@/components/ui/badge";

import type { Column, ColumnDef } from "@tanstack/react-table";
import {
  Music,
  User,
  Clock,
  Calendar,
  Building,
  Hash,
  Disc,
} from "lucide-react";
import * as React from "react";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { TrackTableActions } from "./track-table-actions";

export const columns: ColumnDef<Track>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 32,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "title",
    accessorKey: "title",
    header: ({ column }: { column: Column<Track, unknown> }) => (
      <DataTableColumnHeader column={column} title="Tytuł utworu" />
    ),
    cell: ({ cell }) => (
      <div className="flex items-center gap-2">
        <Music className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{cell.getValue<Track["title"]>()}</span>
      </div>
    ),
    meta: {
      label: "Tytuł utworu",
      placeholder: "Szukaj tytułów...",
      variant: "text",
      icon: Music,
    },
    enableColumnFilter: true,
  },
  {
    id: "artist",
    accessorKey: "artist",
    header: ({ column }: { column: Column<Track, unknown> }) => (
      <DataTableColumnHeader column={column} title="Wykonawca" />
    ),
    cell: ({ cell }) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <span>{cell.getValue<Track["artist"]>()}</span>
      </div>
    ),
    meta: {
      label: "Wykonawca",
      placeholder: "Szukaj wykonawców...",
      variant: "text",
      icon: User,
    },
    enableColumnFilter: true,
  },
  {
    id: "duration",
    accessorKey: "duration",
    header: ({ column }: { column: Column<Track, unknown> }) => (
      <DataTableColumnHeader column={column} title="Czas trwania" />
    ),
    cell: ({ cell }) => (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <Badge variant="secondary" className="font-mono">
          {cell.getValue<Track["duration"]>()}
        </Badge>
      </div>
    ),
    meta: {
      label: "Czas trwania",
      placeholder: "Szukaj czasu trwania...",
      variant: "text",
      icon: Clock,
    },
    enableSorting: true,
  },
  {
    id: "albumName",
    accessorKey: "albumName",
    header: ({ column }: { column: Column<Track, unknown> }) => (
      <DataTableColumnHeader column={column} title="Album" />
    ),
    cell: ({ cell }) => {
      const albumName = cell.getValue<Track["albumName"]>();
      return (
        <div className="flex items-center gap-2">
          <Disc className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {albumName || "Brak danych"}
          </span>
        </div>
      );
    },
    meta: {
      label: "Album",
      placeholder: "Szukaj albumów...",
      variant: "text",
      icon: Disc,
    },
    enableColumnFilter: true,
  },
  {
    id: "releaseYear",
    accessorKey: "releaseYear",
    header: ({ column }: { column: Column<Track, unknown> }) => (
      <DataTableColumnHeader column={column} title="Rok wydania" />
    ),
    cell: ({ cell }) => {
      const year = cell.getValue<Track["releaseYear"]>();
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{year || "—"}</span>
        </div>
      );
    },
    meta: {
      label: "Rok wydania",
      placeholder: "Szukaj roku wydania...",
      variant: "number",
      icon: Calendar,
    },
    enableSorting: true,
  },
  {
    id: "publisher",
    accessorKey: "publisher",
    header: ({ column }: { column: Column<Track, unknown> }) => (
      <DataTableColumnHeader column={column} title="Wydawca" />
    ),
    cell: ({ cell }) => {
      const publisher = cell.getValue<Track["publisher"]>();
      return (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{publisher || "Brak danych"}</span>
        </div>
      );
    },
    meta: {
      label: "Wydawca",
      placeholder: "Szukaj wydawców...",
      variant: "text",
      icon: Building,
    },
    enableColumnFilter: true,
  },
  {
    id: "lyricist",
    accessorKey: "lyricist",
    header: ({ column }: { column: Column<Track, unknown> }) => (
      <DataTableColumnHeader column={column} title="Autor tekstu" />
    ),
    cell: ({ cell }) => {
      const lyricist = cell.getValue<Track["lyricist"]>();
      return (
        <span className="text-sm text-muted-foreground">
          {lyricist || "Brak danych"}
        </span>
      );
    },
    meta: {
      label: "Autor tekstu",
      placeholder: "Szukaj autorów...",
      variant: "text",
      icon: User,
    },
    enableColumnFilter: true,
  },
  {
    id: "composer",
    accessorKey: "composer",
    header: ({ column }: { column: Column<Track, unknown> }) => (
      <DataTableColumnHeader column={column} title="Kompozytor" />
    ),
    cell: ({ cell }) => {
      const composer = cell.getValue<Track["composer"]>();
      return (
        <span className="text-sm text-muted-foreground">
          {composer || "Brak danych"}
        </span>
      );
    },
    meta: {
      label: "Kompozytor",
      placeholder: "Szukaj kompozytorów...",
      variant: "text",
      icon: User,
    },
    enableColumnFilter: true,
  },
  {
    id: "catalogNumbers",
    header: "Numery katalogowe",
    cell: ({ row }) => {
      const phonogramNumber = row.original.phonogramCatalogNumber;
      const trackNumber = row.original.trackCatalogNumber;

      return (
        <div className="space-y-1">
          {phonogramNumber && (
            <div className="flex items-center gap-1">
              <Hash className="h-3 w-3 text-muted-foreground" />
              <Badge variant="outline" className="text-xs">
                F: {phonogramNumber}
              </Badge>
            </div>
          )}
          {trackNumber && (
            <div className="flex items-center gap-1">
              <Hash className="h-3 w-3 text-muted-foreground" />
              <Badge variant="outline" className="text-xs">
                T: {trackNumber}
              </Badge>
            </div>
          )}
          {!phonogramNumber && !trackNumber && (
            <span className="text-xs text-muted-foreground">Brak</span>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      return <TrackTableActions track={row.original} />;
    },
    size: 32,
  },
];
