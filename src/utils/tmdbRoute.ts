import { env } from "../env/server.mjs"

export default function tmdbRoute(route: string) { 
    return `https://api.themoviedb.org/3${route}?api_key=${env.TMDB_API_KEY}`
}
