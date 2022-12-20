import React, { useState } from "react"
import { type NextPage } from "next"

import { trpc } from "@utils/trpc"
import Search from "@components/Search"

const Movies: NextPage = () => {
    const [ currentEndpoint, setCurrentEndpoint ] = useState("popular")

    const { data, isLoading, fetchNextPage } = trpc.tmdb.movies.useInfiniteQuery({
        endpoint: "popular"
    }, {
        getNextPageParam: (lastPage: any, allPages: any) => lastPage.nextPage
    })

    console.log(data?.pages)

    return (
        <div>
            <Search 
                placeholder="Search for stuff"
                mediaType="tv"
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

export default Movies