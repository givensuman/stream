// https://developers.themoviedb.org/3/search

import { publicProcedure } from "../../trpc";
import { z } from "zod"
import tmdbRoute from "@utils/tmdbRoute"

/** 
    Searches the database by query.

    You should specify a route of "tv" or "movies," the "all" route returns poor quality data from the database.
*/

export const search = publicProcedure
    .input(z.object({
        query: z.string(),
        route: z.enum(["all", "tv", "movies"]),
        page: z.number().int().default(1)
    }))
    .query(async ({ input }) => {
        const endpoint = 
            input.route == "tv" ? "tv" :
            input.route == "movies" ? "movie" :
                "keyword"

        return await fetch(tmdbRoute(`/search/${endpoint}`, {
            query: input.query,
            page: input.page
        }), {
            method: "GET"
        })
            .then(res => res.json())
    })