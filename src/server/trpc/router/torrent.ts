import { z } from "zod";
import TorrentSearchApi from "torrent-search-api";

import { router, publicProcedure } from "../trpc";

TorrentSearchApi.enablePublicProviders()

export const torrentRouter = router({
  test: publicProcedure
    .input(z.any())
    .query(async ({ input }) => {
        console.log(TorrentSearchApi)
        return await TorrentSearchApi.search('Bullet Train', 'Movies', 20)
    }),
});
