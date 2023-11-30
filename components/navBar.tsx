"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
    const [activeButton, setActiveButton] = useState<"home" | "blog">();

    const router = useRouter();

    useEffect(() => {
        if (window.location.pathname === "/blog") {
            setActiveButton("blog");
        } else {
            setActiveButton("home");
        }
    }, []);

    return (
        <ol
            className={
                "text-white ml-auto flex gap-6 font-semibold max-h-[30px]"
            }
        >
            <li
                id={"nav-home"}
                className={`hover:cursor-pointer hover:text-[#E95E30] ${
                    activeButton === "home" && "border-b-[3px] border-[#E95E30]"
                }`}
            >
                <Link
                    className="navbar-link"
                    onClick={() => {
                        setActiveButton("home");
                    }}
                    href={"/"}
                >
                    Home
                </Link>
            </li>
            <li
                id={"nav-blog"}
                className={`hover:cursor-pointer hover:text-[#E95E30] ${
                    activeButton === "blog" && "border-b-[3px] border-[#E95E30]"
                }`}
            >
                <Link
                    className="navbar-link"
                    onClick={() => {
                        setActiveButton("blog");
                    }}
                    href={"blog"}
                >
                    Blog
                </Link>
            </li>
        </ol>
    );
}
