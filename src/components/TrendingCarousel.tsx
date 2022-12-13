import React from "react"

import { trpc } from "@utils/trpc"

const TrendingCarousel: React.FC = (props) => {
    
    const { data, isLoading } = trpc.tmdb.trending.useQuery({
        media_type: "all",
        time_window: "day"
    })
    
    return (
        null
    )
}

export default TrendingCarousel