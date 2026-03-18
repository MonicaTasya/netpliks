"use client";
import { useFavorites } from "@/src/components/Context/FavoriteContext";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Movie {
    id: number;
    title: string;
}

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedGenre, setSelectedGenre] = useState(""); // State untuk filter
    const [searchTerm, setSearchTerm] = useState(""); // State untuk search
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const { favorites, addToFavorite, removeFromFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            // Jika genre dipilih, tembak API discover. Jika tidak, tembak trending.
            const url = selectedGenre
                ? `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}`
                : `https://api.themoviedb.org/3/discover/movie`;

            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` },
            });
            if (!res.ok) {
                console.error("Gagal ambil data:", res.statusText);
                setMovies([]); // Set kosong biar gak error filter
                setLoading(false);
                return;
            }
            const data = await res.json();
            setMovies(data.results);
            setLoading(false);
        }

        fetchMovies();
    }, [selectedGenre]); // <--- EFEK INI JALAN TIAP genre BERUBAH

    // Search tetap dilakukan secara lokal dari hasil fetch terbaru
    const displayedMovies =
        movies.filter((m) => m.title.toLowerCase().includes(debouncedTerm.toLowerCase())) || [];

    useEffect(() => {
        // 1. Pasang timer (tunggu 500ms)
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        // 2. Trik Ajaib: "Cleanup Function"
        // Kalau user ngetik lagi SEBELUM 500ms, timer yang lama DIHAPUS
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    return (
        <div className="p-8">
            {/* Tombol Filter - Mengubah State */}
            <div className="mb-4 flex gap-2">
                <button onClick={() => setSelectedGenre("")}>All</button>
                <button onClick={() => setSelectedGenre("28")}>Action</button>
                <button onClick={() => setSelectedGenre("35")}>Comedy</button>
                <Link href="/favorites" className="rounded bg-blue-500 p-2">
                    Lihat Favorit ({favorites.length})
                </Link>
            </div>

            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari dari hasil filter..."
                className="mb-4 w-full border p-2 text-black"
            />

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {displayedMovies.map((movie) => (
                        <div key={movie.id} className="border p-2">
                            {movie.title}
                            <button
                                onClick={() =>
                                    isFavorite(movie.id)
                                        ? removeFromFavorite(movie.id)
                                        : addToFavorite(movie)
                                }
                                className={`mt-2 rounded p-1 text-sm ${isFavorite(movie.id) ? "bg-red-500" : "bg-gray-600"}`}>
                                {isFavorite(movie.id) ? "❤️ Hapus" : "🤍 Favorit"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
