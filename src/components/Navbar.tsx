import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { clsx } from 'clsx'

import { FaHome, FaTv, FaFilm } from 'react-icons/fa'

const Navbar: React.FC = () => {

    const router = useRouter()
    const currentPage = router && (router.asPath.split("/")[1] as string).length > 0 ? router.asPath.split("/")[1] : "/"

    return (
        <div className="w-screen bg-slate-800 py-4 px-2 flex flex-row items-center justify-center">
            <div className="max-w-2xl space-x-4 flex flex-row">
                <Link href="/">
                    <Button 
                        icon={<FaHome />}
                        active={currentPage == "/"}
                    >
                        Home  
                    </Button>
                </Link>
                <Link href="/tv">
                    <Button 
                        icon={<FaTv />}
                        active={currentPage == "tv"}
                    >
                        TV
                    </Button>
                </Link>
                <Link href="/movies">
                    <Button 
                        icon={<FaFilm />}
                        active={currentPage == "movies"}
                    >
                        Movies
                    </Button>
                </Link>
            </div>
        </div>
    )
}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactNode,
    active?: boolean
}> = ({
    icon,
    active,
    children,
    ...props
}) => {
    return (
        <button
            {...props}
            className={clsx("rounded-md py-2 px-4 text-lg flex flex-row items-center transition-all", {
                "text-sky-400 cursor-default": active,
                "hover:bg-slate-600": !active
            })}
            disabled={active}
        >
            <span className="mr-1.5">{icon}</span>
            {children}
        </button>
    )
}

export default Navbar