// https://developers.themoviedb.org/3/tv

import { publicProcedure } from "../../trpc";
import { z } from "zod"
import tmdbRoute from "@utils/tmdbRoute"

/**
    * Gets data for "tv" media type.
    * Accepts a specific endpoint or a dynamic id.
*/

const dataShape = z.object({
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
    results: z.array(z.object({
        backdrop_path: z.string(),
        first_air_date: z.string(),
        genre_ids: z.array(z.number().int()),
        id: z.number().int(),
        name: z.string(),
        origin_country: z.array(z.any()),
        original_language: z.string().default("en"),
        original_name: z.string(),
        overview: z.string(),
        popularity: z.number(),
        poster_path: z.string(),
        vote_average: z.number(),
        vote_count: z.number()
    }))
})

export const tv = publicProcedure
    .input(z.object({
            endpoint: z.union([
                z.literal("on_the_air"),
                z.literal("popular"),
                z.literal("top_rated")
            ]).default("popular"),
            cursor: z.number().default(1).optional()
        }))
    .output(z.object({
        nextPage: z.number().or(z.boolean()).default(1),
        data: dataShape
    }))
    .query(async ({ input }) => {

        const cursor = input.cursor ?? 1

        const data = await fetch(tmdbRoute(`/tv/${input.endpoint}`, {
            page: cursor
        }))
            .then(res => res.json())

        const nextPage = cursor < data.total_pages ? cursor + 1 : false

        // const validation = dataShape.safeParse(data)
        // if (!validation.success) {
        //     console.error(validation.error.format())
        // }
        
        return {
            data,
            nextPage
        }
    })