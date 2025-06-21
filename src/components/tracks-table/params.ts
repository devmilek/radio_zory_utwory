import { filterItemSchema, sortingItemSchema } from "@/lib/parsers";
import { createLoader, parseAsInteger, parseAsJson } from "nuqs/server";
import { z } from "zod";

export const trackTableParams = {
  perPage: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  sort: parseAsJson(z.array(sortingItemSchema).parse).withDefault([]),
  filters: parseAsJson(z.array(filterItemSchema).parse).withDefault([]),
};

export const loadSearchParams = createLoader(trackTableParams);
