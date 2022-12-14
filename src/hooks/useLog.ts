import { useEffect } from "react"

export default function useLog(
    state: unknown, 
    message = "Logged"
) {
    useEffect(() => console.log(`%c${message}:`, 'color: white; background: seagreen; font-weight: bold; padding: 0 4px;', state), [state, message])
}