"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useFavorites } from "../Context/FavoriteContext";
import { useTheme } from "../Context/ThemeContext";
import { Button } from "./Button";
import { MoonStar, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
    const { favorites } = useFavorites();
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkWidth = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setIsOpen(false); // Otomatis tutup menu kalau layar digedein
        };

        checkWidth(); // Cek pas pertama kali load
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    return (
        <div className="flex w-full items-center justify-center">
            <nav className="fixed top-0 left-0 z-60 w-full rounded-b-2xl bg-white px-5 py-5 text-black shadow-sm drop-shadow-lg 2xl:px-8 2xl:py-6 dark:bg-black dark:text-red-500">
                <div className="flex flex-row justify-between md:px-10">
                    <Link href="/">
                        <h1 className="text-3xl font-extrabold">NETPLIKS</h1>
                    </Link>
                    {!isMobile ? (
                        <div className="flex flex-row items-center gap-4 text-lg">
                            <Link
                                href="/movies"
                                className="font-bold hover:scale-105 hover:underline">
                                Movies
                            </Link>
                            <Link
                                href="/favorites"
                                className="font-bold hover:scale-105 hover:underline">
                                Favorites
                            </Link>
                            <Button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                variant="glass"
                                size="smIcon"
                                className="text-black dark:text-white">
                                {theme === "dark" ? <MoonStar /> : <Sun />}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                variant="glass"
                                size="smIcon"
                                className="text-black dark:text-white">
                                {theme === "dark" ? <MoonStar size={18} /> : <Sun size={18} />}
                            </Button>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-black dark:text-red-600">
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    )}
                </div>
                {/* MOBILE OVERLAY MENU */}
                {isMobile && isOpen && (
                    <div className="absolute top-17 right-0 z-10 flex w-[50vw] flex-col gap-4 border-t border-gray-100 bg-white p-5 shadow-xl dark:border-gray-900 dark:bg-black">
                        <Link
                            href="/movies"
                            onClick={() => setIsOpen(false)}
                            className="border-b border-gray-50 pb-2 text-xl font-bold dark:border-gray-800">
                            Movies
                        </Link>
                        <Link
                            href="/favorites"
                            onClick={() => setIsOpen(false)}
                            className="border-b border-gray-50 pb-2 text-xl font-bold dark:border-gray-800">
                            Favorites ({favorites.length})
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
