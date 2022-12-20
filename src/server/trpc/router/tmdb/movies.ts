// https://developers.themoviedb.org/3/movies

import { publicProcedure } from "../../trpc";
import { z } from "zod"
import tmdbRoute from "@utils/tmdbRoute"

/**
    * Gets data for "movie" media type.
    * Accepts a specific endpoint or a dynamic id.
*/

export const movies = publicProcedure
    .input(z.object({
            endpoint: z.union([
                z.literal("now_playing"),
                z.literal("popular"),
                z.literal("top_rated"),
                z.string()
            ]).default("popular"),
            cursor: z.number().default(1).optional()
        }))
    .query(async ({ input }) => {

        const cursor = input.cursor ?? 1

        const data = await fetch(tmdbRoute(`/movie/${input.endpoint}`, {
            page: cursor
        }))
            .then(res => res.json())

        const nextPage = cursor < data.total_pages ? cursor + 1 : false
        return {
            data,
            nextPage
        }
    })