import { router } from "../../trpc";

import { getTrending } from "./getTrending";
import { search } from "./search";
import { media } from "./media";

export const tmdbRouter = router({
    getTrending: getTrending,
    search: search,
    media: media
})