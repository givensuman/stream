// https://developers.themoviedb.org/3/movies

import { publicProcedure } from "../../trpc";
import { z } from "zod"
import tmdbRoute from "@utils/tmdbRoute"

/**
    * Gets data for "movie" media type.
    * Accepts a specific endpoint or a dynamic id.
*/

export const tv = publicProcedure
    .input(z.object({
            endpoint: z.enum(["now_playing", "popular", "top_rated"]).or(z.string()).default("popular"),
            cursor: z.number().default(1)
        }))
    .query(async ({ input }) => {

        const cursor = input.cursor ?? 1
        const nextPage = cursor + 1

        const data = await fetch(tmdbRoute(`/movie/${input.endpoint}`, {
            page: cursor
        }))
            .then(res => res.json())

        return {
            data,
            nextPage
        }
    })