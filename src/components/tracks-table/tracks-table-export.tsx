"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileJson } from "lucide-react";

import { mkConfig, generateCsv, download } from "export-to-csv";
import { Track } from "@/db/schema";
import { Badge } from "../ui/badge";

interface TrackTableExportProps<TData> {
  table: Table<TData>;
}

const csvConfig = mkConfig({
  useKeysAsHeaders: true,
  filename: "utwory-" + new Date().toISOString(),
  title: "Utwory " + new Date().toLocaleDateString("pl-PL"),
});

export const TrackTableExport = <TData,>({
  table,
}: TrackTableExportProps<TData>) => {
  const selectedRowsCount = table.getSelectedRowModel().rows.length;

  if (selectedRowsCount === 0) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Download className="mr-2 h-4 w-4" />
        Eksportuj
      </Button>
    );
  }

  const exportToCSV = () => {
    const selectedRows = table.getSelectedRowModel().rows;

    const data: Track[] = selectedRows.map((row) => row.original as Track);

    const csv = generateCsv(csvConfig)(data);

    download(csvConfig)(csv);
  };

  const exportToJSON = () => {
    const selectedRows = table.getSelectedRowModel().rows;

    const data: Track[] = selectedRows.map((row) => row.original as Track);

    // Convert data to JSON string with proper formatting
    const jsonString = JSON.stringify(data, null, 2);

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonString], {
      type: "application/json;charset=utf-8;",
    });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = url;

    // Set the file name
    const date = new Date().toISOString();
    link.download = `utwory-${date}.json`;

    // Append to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Eksportuj <Badge variant="secondary">{selectedRowsCount}</Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV}>
          <FileText className="mr-2 h-4 w-4" />
          Eksportuj jako CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON}>
          <FileJson className="mr-2 h-4 w-4" />
          Eksportuj jako JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
