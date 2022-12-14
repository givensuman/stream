// https://developers.themoviedb.org/3/tv

import { publicProcedure } from "../../trpc";
import { z } from "zod"
import tmdbRoute from "@utils/tmdbRoute"

/** 
    Gets one of many TV endpoints. 

    Options include:

        - [tv_id]
        - on_the_air
        - popular
        - top_rated
*/

export const getTv = publicProcedure
    .input(z.object({
        endpoint: z.string()
    }))
    .query(async ({ input }) => {
        return await fetch(tmdbRoute(`/tv/${input.endpoint}`))
            .then(res => res.json())
    })