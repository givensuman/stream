import React, { useState } from "react"
import clsx from "clsx"
import { useSwipeable } from "react-swipeable"

import { trpc } from "@utils/trpc"
import tmdbImage from "@utils/tmdbImage"

import useInterval from "@hooks/useInterval"

const TrendingCarousel: React.FC = (props) => {
    
    const { data, isLoading } = trpc.tmdb.trending.useQuery({
        media_type: "all",
        time_window: "day"
    })
    
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const iterateIndex = (direction: "up" | "down") => {
        if (!data || showDetails) return
        if (direction == "up") setCurrentIndex(state => state < data?.results.length - 1 ? state + 1 : 0)
        if (direction == "down") setCurrentIndex(state => state != 0 ? state - 1 : data?.results.length)
    }
    const [ showDetails, setShowDetails ] = useState(false)

    const slideDuration = 10000
    useInterval(() => { iterateIndex("up") }, slideDuration)

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => iterateIndex("up"),
        onSwipedRight: () => iterateIndex("down")
    })

    if (isLoading)
    return <span>Loading...</span>

    return (
        <main {...props}>
            <div 
                className="flex flex-row overflow-hidden max-w-4xl m-auto relative cursor-pointer"  
                {...swipeHandlers}
                onMouseEnter={() => setShowDetails(false)}
                onMouseLeave={() => setShowDetails(true)}
            >
                {data!.results.map(item =>
                    <div 
                        key={item.id} 
                        className="min-w-full object-cover relative transition-all"
                        style={{
                            transform: `translateX(calc(-100% * ${currentIndex}))`,
                            transitionDuration: "500ms"
                        }}
                        onMouseEnter={() => setShowDetails(true)}
                        onMouseOut={() => setShowDetails(false)}
                    >
                        <img
                            src={tmdbImage(item.backdrop_path)}
                            alt={item.name || item.title}
                            className={clsx("transition-all", {
                                "blur-md": showDetails
                            })}
                            draggable={false}
                        />
                        <h1 className="absolute bottom-0 left-0 p-4 py-8 w-full text-slate-200 text-6xl bg-gradient-to-t from-slate-900 to-transparent select-none">
                            {String(showDetails)}
                        </h1>
                        {showDetails && <>
                            <p className="absolute top-0 text-white">{item.overview}</p>
                        </>}
                    </div>
                )}
                <div 
                    className="flex flex-row absolute bottom-2 left-1/2 space-x-2"
                    style={{
                        transform: "translateX(-50%)"
                    }}
                >
                        {data!.results.map((_, index) => 
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={clsx("bg-slate-200 h-2 w-2 rounded-lg transition-all opacity-40 hover:opacity-60", {
                                    "opacity-80": index == currentIndex
                                })}
                            /> 
                        )}
                </div>
            </div>
        </main>
    )
}

export default TrendingCarousel