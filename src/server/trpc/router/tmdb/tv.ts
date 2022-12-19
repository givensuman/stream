// https://developers.themoviedb.org/3/tv

import { publicProcedure } from "../../trpc";
import { z } from "zod"
import tmdbRoute from "@utils/tmdbRoute"

/**
    * Gets data for "tv" media type.
    * Accepts a specific endpoint or a dynamic id.
*/

export const tv = publicProcedure
    .input(z.object({
            endpoint: z.union([
                z.literal("on_the_air"),
                z.literal("popular"),
                z.literal("top_rated"),
                z.string()
            ]).default("popular"),
            cursor: z.number().default(1).optional()
        }))
    .query(async ({ input }) => {

        const cursor = input.cursor ?? 1
        const nextPage = cursor + 1

        const data = await fetch(tmdbRoute(`/tv/${input.endpoint}`, {
            page: cursor
        }))
            .then(res => res.json())

        return {
            data,
            nextPage
        }
    })