import { DEFAULT_PAGE } from "@/constants";
import { createLoader } from "nuqs/server";
import {parseAsInteger, parseAsString} from "nuqs/server";

export const filterSearchParams = {
     search: parseAsString.withDefault("").withOptions({clearOnDefault:true}),
    page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault:true})
};

export const loadSearchParams = createLoader(filterSearchParams)
