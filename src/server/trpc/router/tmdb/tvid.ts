// https://developers.themoviedb.org/3/tv/get-tv-details

import { publicProcedure } from "../../trpc";
import { z } from "zod"
import tmdbRoute from "@utils/tmdbRoute"

/**
    * Gets data for a TV show by its ID.
    * Necessarily distinct from ./tv.ts because of differences in output schema.
*/

const dataShape = z.object({
    adult: z.boolean(),
    backdrop_path: z.string(),
    created_by: z.array(z.unknown()).optional(),
    episode_run_time: z.array(z.number()),
    first_air_date: z.string(),
    genres: z.array(z.object({
        id: z.number().int(),
        name: z.string()
    })),
    homepage: z.string().optional(),
    id: z.number().int(),
    in_production: z.boolean(),
    languages: z.array(z.string().length(2)),
    last_air_date: z.string().or(z.null()),
    last_episode_to_air: z.object({}).or(z.null()),
    name: z.string(),
    networks: z.array(z.object({
        id: z.number().int(),
        name: z.string(),
        logo_path: z.string()
    })),
    next_episode_to_air: z.object({}).or(z.null()),
    number_of_episodes: z.number().int(),
    number_of_seasons: z.number().int(),
    origin_country: z.array(z.string().length(2)),
    original_language: z.string().default("en"),
    original_name: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().or(z.null()),
    production_companies: z.array(z.object({})),
    production_countries: z.array(z.object({})),
    seasons: z.array(z.object({
        air_date: z.string(),
        episode_count: z.number().int(),
        id: z.number().int(),
        name: z.string(),
        overview: z.string(),
        poster_path: z.string().or(z.null()),
        season_number: z.number().int()
    })),
    spoken_languages: z.array(z.object({})),
    status: z.string(),
    tagline: z.string(),
    type: z.string(),
    vote_average: z.number(),
    vote_count: z.number()
})

export const tvid = publicProcedure
    .input(z.object({
        id: z.string()
    }))
    .output(dataShape)
    .query(async ({ input }) => {

        const data = await fetch(tmdbRoute(`/tv/${input.id}`))
            .then(res => res.json())

        const validation = dataShape.safeParse(data)
        if (!validation.success) {
            console.error(validation.error.format())
        }
        
        return data
    })