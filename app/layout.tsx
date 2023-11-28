import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import NavBar from "@/components/navBar";
import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export const metadata: Metadata = {
    title: "Social Brothers Preview blog",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="nl">
            <body className="max-w-[1440px] mx-auto">
                <header>
                    <nav
                        className={
                            "bg-gray-500 h-[208px] bg-header bg-no-repeat bg-center"
                        }
                    >
                        <div className={"pt-[32px] max-w-[1116px] m-auto flex"}>
                            <Link
                                aria-description="navigeer naar home"
                                href="/"
                            >
                                <Image
                                    src={"./logo.svg"}
                                    alt="Social Brothers Logo"
                                    width={240}
                                    height={57}
                                ></Image>
                            </Link>
                            <NavBar />
                        </div>
                    </nav>
                </header>
                <main className={"flex min-h-screen"}>{children}</main>
                <footer></footer>
            </body>
        </html>
    );
}
