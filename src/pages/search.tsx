import React, { useState } from "react"
import { useRouter } from "next/router"

import { trpc } from "@utils/trpc"
import tmdbRoute from "@utils/tmdbRoute"
import tmdbImage from "@utils/tmdbImage"

import { z } from "zod"

import useLog from "@hooks/useLog"
import Image, { ImageProps } from "next/image"
import clsx from "clsx"

const Search: React.FC = () => {

    const router = useRouter()
    const { in: route, for: query } = router.query

    const { data, isLoading } = trpc.tmdb.search.useQuery({
        query: encodeURI(query as string),
        route: route as ("all" | "tv" | "movies"),
        page: 1
    }, {
        enabled: (!!route && !!query)
    })

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div className="flex flex-row flex-wrap space-x-4 space-y-4 justify-center items-center">
            {data?.results.map((item, index) => {
                return (
                    <Card 
                        key={item.id}
                        src={tmdbImage(item.poster_path)}
                        alt={item.title || item.name}
                    />
                )
            })}
        </div>
    )
}

export const Card: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
    alt,
    ...props
}) => {

    const [ isLoaded, setIsLoaded ] = useState(false)

    return (
        <div className="relative shadow-lg">
            <img
                alt={alt}
                {...props}
                className="h-64 w-auto"
                onLoad={() => setIsLoaded(true)}
            />
            <div className={clsx("absolute top-0 right-0 bottom-0 left-0 animate-pulse bg-slate-300 h-64 w-auto", {
                "hidden": isLoaded
            })} />
        </div>
    )
}

export default Search