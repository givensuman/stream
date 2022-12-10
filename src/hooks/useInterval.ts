import { useEffect, useRef } from "react"

export default function useInterval(
    callback: () => void,
    interval: number
) {
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        if (interval === 0) console.warn("useInterval requires an integer value for the interval argument")

        const runningInterval = setInterval(callbackRef.current, interval)
        return () => clearInterval(runningInterval)
    })
}