import { z } from "zod";
import TorrentSearchApi from "torrent-search-api";

import { router, publicProcedure } from "../trpc";

TorrentSearchApi.enablePublicProviders()

export const torrentRouter = router({
  search: publicProcedure
    .input(z.object({
        query: z.string(),
        category: z.union([
            z.literal("all"),
            z.literal("movies"),
            z.literal("tv")
        ]).default("all"),
        limit: z.number().optional().default(20)
    }))
    .output(z.array(z.object({
        desc: z.string().url(),
        peers: z.number().int(),
        provider: z.string(),
        seeds: z.number().int(),
        size: z.string(),
        time: z.string(),
        title: z.string(),
        link: z.string()
    }).partial()))
    .query(async ({ input }) => {
        const capitalizedCategory = input.category[0]?.toUpperCase() + input.category.slice(1)
        return await TorrentSearchApi.search(input.query, capitalizedCategory, input.limit)
    }),
});
