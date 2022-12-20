import { router } from "../../trpc";

import { getTrending } from "../../../../../trash/getTrending";
import { search } from "./search";
import { tv } from "./tv"
import { tvid } from "./tvid"
import { movies } from "./movies"

export const tmdbRouter = router({
    getTrending: getTrending,
    search: search,
    tv: tv,
    tvid: tvid,
    movies: movies
})