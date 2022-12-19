import { router } from "../trpc";

import { tmdbRouter } from "./tmdb";
import { torrentRouter } from "./torrent"

export const appRouter = router({
  tmdb: tmdbRouter,
  torrent: torrentRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
