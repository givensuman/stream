import React, { useState } from "react"
import Link from "next/link"
import clsx from "clsx"

import { FaSearch } from "react-icons/fa"

const Search: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {
    mediaType?: "tv" | "movies"
}> = ({
    mediaType = "all",
    className,
    ...props
}) => {

    const [ input, setInput ] = useState<null | string>(null)
    const invalidInput = !input || input.length == 0
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <div className="flex flex-row items-center  mb-8 ">
            <div className="bg-slate-600 rounded-md flex flex-row items-center">
                <span className="mx-4 text-xl text-slate-400">
                    <FaSearch />
                </span>
                <input
                    {...props}
                    className={clsx("px-4 pr-8 py-2 rounded-md text-2xl bg-gradient-to-r from-slate-600 to-slate-500 transition-all outline-none border-none focus:ring-4 focus:ring-sky-400", className)}
                    onInput={handleInput}
                />
            </div>
            <Link href={`/search?in=${mediaType}&for=${input}`}>
                <button 
                    className="bg-slate-500 py-3 px-3 rounded-md ml-2 font-bold outline-none border-none transition-all focus:ring-4 focus:ring-sky-400 disabled:opacity-30"
                    disabled={invalidInput}
                    draggable={false}
                >
                    Search
                </button>
            </Link>
        </div>
    )
}

export default Search