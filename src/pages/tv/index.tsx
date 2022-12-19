import React, { useState } from "react"
import { type NextPage } from "next"
import Link from "next/link"

import { trpc } from "@utils/trpc"
import Search from "@components/Search"

const Tv: NextPage = () => {
    const [ currentEndpoint, setCurrentEndpoint ] = useState("popular")

    const { data, isLoading, fetchNextPage } = trpc.tmdb.tv.useInfiniteQuery({
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
                        <Link
                            key={item.id}
                            href={`/tv/${item.id}`}
                        >
                            {item.name}
                        </Link>
                    )
                })]
            })}
        </div>
    )
}

export default Tv