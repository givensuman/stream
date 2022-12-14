import { env } from "../env/server.mjs"

export default function tmdbRoute(
    route: string, 
    params?: { [key: string]: unknown }
) { 
    const stringifiedParams = params ? "&" + Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&") : ""

    return `https://api.themoviedb.org/3${route}?api_key=${env.TMDB_API_KEY}${stringifiedParams}`
}
