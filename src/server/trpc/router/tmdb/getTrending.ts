import { publicProcedure } from "../../trpc";
import { z } from "zod"
import tmdbRoute from "@utils/tmdbRoute"

const mediaType = ["all", "movie", "tv", "person"] as const

/** 
    * The shape of the data returned by the TMDB API.
    * Some values are indiscriminate, whereas some keys differ depending on media_type
*/

const dataShape = z.object({
    page: z.number(),
    results: z.array(z.object({
        adult: z.boolean(),
        backdrop_path: z.string(),
        first_air_date: z.string().optional(),
        release_date: z.string().optional(),
        genre_ids: z.array(z.number()),
        id: z.number(),
        media_type: z.enum(mediaType),
        name: z.string().optional(),
        title: z.string().optional(),
        origin_country: z.array(z.string()).optional(),
        original_language: z.string().default("en"),
        original_name: z.string().optional(),
        original_title: z.string().optional(),
        overview: z.string(),
        popularity: z.number(),
        poster_path: z.string(),
        vote_average: z.number(),
        vote_count: z.number()
    })),
    total_pages: z.number(),
    total_results: z.number()
})

// const indiscriminateDataShape = z.object({
//     page: z.number(),
//     results: z.array(
//         z.object({
//             adult: z.boolean(),
//             backdrop_path: z.string(),
//             genre_ids: z.array(z.number()),
//             id: z.number(),
//             media_type: z.enum(mediaType),
//             original_language: z.string().default("en"),
//             overview: z.string(),
//             popularity: z.number(),
//             poster_path: z.string(),
//             vote_average: z.number(),
//             vote_count: z.number()
//         })
//     ),
//     total_pages: z.number(),
//     total_results: z.number()
// })

// const dataShape = z.discriminatedUnion('media_type', [
//     z.object({
//         media_type: z.literal("tv"),
//         name: z.string(),
//         first_air_date: z.string(),
//         original_name: z.string(),
//         origin_country: z.array(z.string())
//     }).merge(indiscriminateDataShape),
//     z.object({
//         media_type: z.literal("movie"),
//         title: z.string(),
//         release_date: z.string(),
//         original_title: z.string()
//     }).merge(indiscriminateDataShape),
//     z.object({
//         media_type: z.literal("all")
//     }).merge(indiscriminateDataShape),
//     z.object({
//         media_type: z.literal("person")
//     }).merge(indiscriminateDataShape)
// ])

export const getTrending = publicProcedure
    .input(z.object({
        media_type: z.enum(mediaType).default("all"),
        time_window: z.enum(["day", "week"]).default("day")
    }))
    .output(dataShape)
    .query(async ({ input }) => {
        const data = await fetch(tmdbRoute(`/trending/${input.media_type}/${input.time_window}`), {
            method: "GET"
        })
            .then(res => res.json())
        const safeness = dataShape.safeParse(data)
        if (!safeness.success) console.log(safeness.error.format())
        return data
        
    })