"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Track } from "@/db/schema";
import { deleteTrack } from "@/actions/delete-track";
import { toast } from "sonner";
import { CreateTrackDialog } from "../create-track-dialog";

export const TrackTableActions = ({ track }: { track: Track }) => {
  const handleDelete = async () => {
    const { status, message } = await deleteTrack(track.id);

    if (status === 200) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <CreateTrackDialog
        data={track}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></CreateTrackDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Otwórz menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edytuj
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            variant="destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Usuń
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
