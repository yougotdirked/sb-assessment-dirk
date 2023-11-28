'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NavBar() {
    const [activeButton, setActiveButton] = useState<'home' | 'blog'>()

    useEffect(() => {
        if (window.location.pathname === '/blog') {
            setActiveButton('blog')
        } else {
            setActiveButton('home')
        }
    }, [])

    return (
        <ol
            className={
                'text-white ml-auto flex gap-6 font-semibold max-h-[30px]'
            }
        >
            <li
                id={'nav-home'}
                className={`hover:cursor-pointer hover:text-[#E95E30] ${
                    activeButton === 'home' && 'border-b-2 border-[#E95E30]'
                }`}
            >
                <Link
                    onClick={() => {
                        setActiveButton('home')
                    }}
                    href={'/'}
                >
                    Home
                </Link>
            </li>
            <li
                id={'nav-blog'}
                className={`hover:cursor-pointer hover:text-[#E95E30] ${
                    activeButton === 'blog' && 'border-b-2 border-[#E95E30]'
                }`}
            >
                <Link
                    onClick={() => {
                        setActiveButton('blog')
                    }}
                    href={'blog'}
                >
                    Blog
                </Link>
            </li>
        </ol>
    )
}
