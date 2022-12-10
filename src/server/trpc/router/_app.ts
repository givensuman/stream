import { router } from "../trpc";

import { tmdbRouter } from "./tmdb";

export const appRouter = router({
  tmdb: tmdbRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
