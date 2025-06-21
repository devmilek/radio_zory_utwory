"use client";

import { useDataTable } from "@/hooks/use-data-table";

import * as React from "react";
import { columns } from "./columns";
import { Track } from "@/db/schema";
import { DataTable } from "../data-table/data-table";
import { DataTableAdvancedToolbar } from "../data-table/data-table-advanced-toolbar";
import { DataTableSortList } from "../data-table/data-table-sort-list";
import { TrackTableExport } from "./tracks-table-export";

export function TracksDataTable({
  data,
  pageCount,
}: {
  data: Track[];
  pageCount: number;
}) {
  const { table } = useDataTable({
    data,
    columns: columns,
    pageCount,
    initialState: {
      sorting: [{ id: "title", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (row) => row.id.toString(),
    shallow: false,
  });

  return (
    <div className="data-table-container">
      <DataTable table={table}>
        <DataTableAdvancedToolbar table={table}>
          <TrackTableExport table={table} />
          <DataTableSortList table={table} />
        </DataTableAdvancedToolbar>
      </DataTable>
    </div>
  );
}
