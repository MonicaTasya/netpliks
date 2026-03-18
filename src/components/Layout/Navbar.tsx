"use client";
import Link from "next/link";
import { useFavorites } from "../Context/FavoriteContext";

const Navbar = () => {
    const { favorites } = useFavorites();
    return (
        <div className="flex w-full justify-center text-red-500">
            <nav className="fixed top-0 left-0 z-60 w-full rounded-b-2xl bg-black px-5 py-5 shadow-sm drop-shadow-lg 2xl:px-8 2xl:py-6">
                <div className="flex flex-row justify-between">
                    <Link href="/">
                        <h1 className="text-2xl font-extrabold">NETPLIKS</h1>
                    </Link>
                    <div className="flex flex-row items-center gap-2">
                        <Link href="/movies" className="text-md font-bold">
                            Movies
                        </Link>
                        <Link href="/favorites" className="text-md font-bold">
                            Favorites ({favorites.length})
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
