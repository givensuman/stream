import { router } from "../../trpc";

import { getTrending } from "./getTrending";

export const tmdbRouter = router({
    getTrending: getTrending
})