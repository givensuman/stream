import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { NextPage } from "next"

import { trpc } from "@utils/trpc"
import Search from "@components/Search"

const Media: NextPage = () => {
    
    const router = useRouter()

    const { media } = router.query

    const { data, isLoading } = trpc.tmdb.getTv.useQuery({
        endpoint: "popular"
    })
    
    return (
        <div>
            <Search />
            {`You're looking at`} {media}
        </div>
    )
}

Media.getInitialProps = async (context) => {
    if (context.query.media != ("tv" || "movies")) throw new Error("Invalid route for media component")

    return {}
}

export default Media