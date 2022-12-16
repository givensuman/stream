import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { NextPage } from "next"

import { trpc } from "@utils/trpc"
import Search from "@components/Search"
import useLog from "@hooks/useLog"
import useInterval from "@hooks/useInterval"

const Media: NextPage = () => {
    
    const router = useRouter()

    const { media } = router.query

    const { data, isLoading, fetchNextPage } = trpc.tmdb.media.useInfiniteQuery({
        mediaType: "tv",
        endpoint: "popular"
    }, {
        getNextPageParam: (lastPage, allPages) => lastPage.nextPage
    })

    return (
        <div>
            <Search 
                placeholder="Search for stuff"
                mediaType={media as "tv" | "movies"}
            />
            {data?.pages.flatMap(page => {
                return [...page.data.results.map(item => {
                    return (
                        <h1 key={item.id}>{item.name}</h1>
                    )
                })]
            })}
        </div>
    )
}

Media.getInitialProps = async ({ query: { media } } ) => {
    if (!["movies", "tv"].includes(media as string)) 
        throw new Error(`Invalid route for media component. You passed "${media}" but I only accept "tv" or "movies"`)

    return {}
}

export default Media