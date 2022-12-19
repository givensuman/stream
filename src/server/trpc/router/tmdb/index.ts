import { router } from "../../trpc";

import { getTrending } from "../../../../../trash/getTrending";
import { search } from "./search";
import { tv } from "./tv"

export const tmdbRouter = router({
    getTrending: getTrending,
    search: search,
    tv: tv
})