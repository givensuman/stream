// https://developers.themoviedb.org/3/tv
// https://developers.themoviedb.org/3/movies

import { publicProcedure } from "../../trpc";
import { z } from "zod"
import tmdbRoute from "@utils/tmdbRoute"

/**
    * Gets data for "tv" or "movies" media type.
    * Accepts a specific endpoint or a dynamic id.
*/

export const media = publicProcedure
    .input(z.discriminatedUnion("mediaType", [
        // mediaType = "tv"
        z.object({
            mediaType: z.literal("tv"),
            endpoint: z.enum(["on_the_air", "popular", "top_rated"]).or(z.string())
        }),
        // mediaType = "movies"
        z.object({
            mediaType: z.literal("movies"),
            endpoint: z.enum(["now_playing", "popular", "top_rated"]).or(z.string())
        })
    ]).and(z.object({
        cursor: z.number().default(1)
    })))
    .query(async ({ input }) => {

        const { cursor } = input
        const nextPage = cursor + 1

        const data = await fetch(tmdbRoute(`/${input.mediaType}/${input.endpoint}`, {
            page: cursor
        }))
            .then(res => res.json())

        return {
            data,
            nextPage
        }
    })