"use client";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/src/components/Context/FavoriteContext";
import { Bookmark } from "lucide-react";
import { Button } from "./Button";

interface Movie {
    id: number;
    title: string;
    poster_path?: string;
}

export default function MovieCard({ movie }: { movie: Movie }) {
    const { isFavorite, addToFavorite, removeFromFavorite } = useFavorites();
    const favorite = isFavorite(movie.id);

    // Fallback Gambar
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/notfound.webp";

    return (
        <div className="group relative flex h-100 flex-col overflow-hidden rounded-lg bg-black text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:shadow-none">
            {/* Bagian Gambar */}
            <Link href={`/movies/${movie.id}`} className="relative aspect-2/3 overflow-hidden">
                <Image
                    width={100}
                    height={150}
                    src={posterUrl}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </Link>

            {/* Bagian Konten */}
            <div className="flex flex-row items-center justify-between p-4">
                <Link href={`/movies/${movie.id}`}>
                    <h3
                        className="w-40 text-sm font-bold wrap-break-word transition-colors hover:text-blue-500 md:text-base"
                        title={movie.title}>
                        {movie.title || "Untitled Movie"}
                    </h3>
                </Link>

                {/* Tombol Favorit */}
                <Button
                    variant="gray"
                    size="smIcon"
                    onClick={() =>
                        favorite ? removeFromFavorite(movie.id) : addToFavorite(movie)
                    }>
                    <Bookmark
                        size={26}
                        className={favorite ? "text-red-500" : "text-gray-300"}
                        fill={favorite ? "currentColor" : "none"}
                    />
                </Button>
            </div>
        </div>
    );
}
