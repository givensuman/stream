// https://developers.themoviedb.org/3/trending/get-trending

import { publicProcedure } from "../src/server/trpc/trpc";
import { z } from "zod"
import tmdbRoute from "@utils/tmdbRoute"

const mediaType = ["all", "movie", "tv", "person"] as const

/** 
    * The shape of the data returned by the TMDB API.
    * Some values are indiscriminate, whereas some keys differ depending on media_type.
*/

const dataShape = z.object({
    page: z.number(),
    results: z.array(z.discriminatedUnion("media_type", [
        // media_type = "tv"
        z.object({
            media_type: z.literal('tv'),
            name: z.string(),
            first_air_date: z.string(),
            original_name: z.string(),
            origin_country: z.array(z.string()),
            title: z.never(),
            release_date: z.never(),
            original_title: z.never()
        }),
        // media_type = "movie"
        z.object({
            media_type: z.literal('movie'),
            title: z.string(),
            release_date: z.string(),
            original_title: z.string(),
            name: z.never(),
            first_air_date: z.never(),
            original_name: z.never(),
            origin_country: z.never()
        }),
        // media_type = "all" || "person"
        z.object({
            media_type: z.literal("all")
        }),
        z.object({
            media_type: z.literal("person")
        })
    ]).and(z.object({
        adult: z.boolean(),
        backdrop_path: z.string(),
        genre_ids: z.array(z.number()),
        id: z.number(),
        original_language: z.string().default('en'),
        overview: z.string(),
        popularity: z.number(),
        poster_path: z.string(),
        vote_average: z.number(),
        vote_count: z.number(),
    }))),
    total_pages: z.number(),
    total_results: z.number(),
})

/** 
    Gets trending items from the database.
*/

export const getTrending = publicProcedure
    .input(z.object({
        media_type: z.enum(mediaType).default("all"),
        time_window: z.enum(["day", "week"]).default("day")
    }))
    // .output(dataShape)
    .query(async ({ input }) => {
        return await fetch(tmdbRoute(`/trending/${input.media_type}/${input.time_window}`), {
            method: "GET"
        })
            .then(res => res.json())
        
    })