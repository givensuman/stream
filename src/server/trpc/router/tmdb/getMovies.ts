// https://developers.themoviedb.org/3/movies

import { publicProcedure } from "../../trpc";
import { z } from "zod"
import tmdbRoute from "@utils/tmdbRoute"

/** 
    Gets one of many movie endpoints. 

    Options include:

        - [movie_id]
        - now_playing
        - popular
        - top_rated
*/

export const getMovies = publicProcedure
    .input(z.object({
        endpoint: z.string()
    }))
    .query(async ({ input }) => {
        return await fetch(tmdbRoute(`/movie/${input.endpoint}`))
            .then(res => res.json())
    })