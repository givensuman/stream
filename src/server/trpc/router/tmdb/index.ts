import { router } from "../../trpc";

import { getTrending } from "./getTrending";
import { search } from "./search";
import { getMovies } from "./getMovies";
import { getTv } from "./getTv";

export const tmdbRouter = router({
    getTrending: getTrending,
    search: search,
    getMovies: getMovies,
    getTv: getTv,
})