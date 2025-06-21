"use client";

import React from "react";
import { CreateTrackDialog } from "./create-track-dialog";
import { Button } from "./ui/button";

export const CreateTrackButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <CreateTrackDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button onClick={() => setIsOpen(true)}>Dodaj utwór</Button>
    </>
  );
};
