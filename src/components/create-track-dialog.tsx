"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTrackSchema, createTrackSchema } from "@/schemas/track-schema";
import { Input } from "./ui/input";
import { createTrack } from "@/actions/create-track";
import { toast } from "sonner";
import { Track } from "@/db/schema";
import { editTrack } from "@/actions/edit-track";

export const CreateTrackDialog = ({
  data,
  isOpen,
  setIsOpen,
}: {
  data?: Track;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const isEditMode = Boolean(data);
  const form = useForm<CreateTrackSchema>({
    resolver: zodResolver(createTrackSchema),
    defaultValues: {
      title: data?.title || "",
      artist: data?.artist || "",
      albumName: data?.albumName || "",
      lyricist: data?.lyricist || "",
      composer: data?.composer || "",
      duration: data?.duration || "",
      publisher: data?.publisher || "",
      releaseYear: data?.releaseYear || undefined,
      phonogramCatalogNumber: data?.phonogramCatalogNumber || "",
      trackCatalogNumber: data?.trackCatalogNumber || "",
    },
  });

  const onSubmit = async (values: CreateTrackSchema) => {
    if (isEditMode && data?.id) {
      const { status, message } = await editTrack(values, data.id);

      if (status === 201) {
        form.reset();
        toast.success(message);
        setIsOpen(false);
      } else {
        toast.error(message);
      }
    } else {
      const { status, message } = await createTrack(values);

      if (status === 201) {
        form.reset();
        toast.success(message);
        setIsOpen(false);
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edytuj utwór" : "Dodaj nowy utwór"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Edytuj szczegóły utworu, aby zaktualizować informacje."
              : "Wprowadź szczegóły nowego utworu, aby dodać go do bazy danych."}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Podstawowe informacje - jedna kolumna */}
              <div className="space-y-4">
                <h3 className="font-semibold">Podstawowe informacje</h3>

                {/* Tytuł utworu - pełna szerokość */}
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tytuł utworu *</FormLabel>
                      <FormControl>
                        <Input placeholder="Wpisz tytuł utworu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Wykonawca i Czas trwania - dwie kolumny */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="artist"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wykonawca *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Wpisz nazwę wykonawcy"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="duration"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Czas trwania *</FormLabel>
                        <FormControl>
                          <Input placeholder="mm:ss (np. 3:45)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Informacje o albumie */}
              <div className="space-y-4">
                <h3 className="font-semibold">Informacje o albumie</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="albumName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nazwa albumu</FormLabel>
                        <FormControl>
                          <Input placeholder="Wpisz nazwę albumu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="releaseYear"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rok wydania</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="YYYY (np. 2023)"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="publisher"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wydawca</FormLabel>
                      <FormControl>
                        <Input placeholder="Wpisz nazwę wydawcy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Autorzy */}
              <div className="space-y-4">
                <h3 className="font-semibold">Autorzy</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="lyricist"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Autor tekstu</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Wpisz imię i nazwisko autora tekstu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="composer"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kompozytor/Autor muzyki</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Wpisz imię i nazwisko kompozytora"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Numery katalogowe */}
              <div className="space-y-4">
                <h3 className="font-semibold">Numery katalogowe</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="phonogramCatalogNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numer katalogowy fonogramu</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tylko litery i cyfry (np. ABC123)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="trackCatalogNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numer katalogowy utworu</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tylko litery i cyfry (np. TRK001)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Przyciski */}
              <div className="flex justify-end space-x-2 pt-6 border-t">
                <Button type="button" variant="outline">
                  Anuluj
                </Button>
                <Button type="submit">Dodaj utwór</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
