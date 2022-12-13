import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode
}

const RouteButton: React.FC<Props> = ({ 
    icon,
    children, 
    ...props 
}) => {
    return (
        <button 
            {...props}
            className="bg-slate-800 rounded-lg w-36 h-36 text-2xl flex flex-col items-center pt-3 transition-all hover:bg-gradient-to-br hover:from-neutral-800 hover:to-neutral-900 focus:ring-4 focus:ring-sky-400 focus:outline-none"
        >
            {children}
            <span className="text-6xl my-3">
                {icon}
            </span>
        </button>
    )
}

export default RouteButton