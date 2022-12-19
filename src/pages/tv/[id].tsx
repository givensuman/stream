import React from "react"
import { type NextPage } from "next"
import { useRouter } from "next/router"

import { trpc } from "@utils/trpc"

const TvId: NextPage = () => {

    const router = useRouter()
    const { id } = router.query

    const { data, isLoading } = trpc.tmdb.tv.useQuery({
        endpoint: id
    }, {
        enabled: !!id
    })

    console.log(data)

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div>
            <h1>{data?.data.name}</h1>
            <p>{data?.data.overview}</p>
        </div>
    )
}

export default TvId