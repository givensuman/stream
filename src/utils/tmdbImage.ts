export default function tmdbImage(path: string, size = "original") {
    return `https://image.tmdb.org/t/p/${size}/${path}`
}