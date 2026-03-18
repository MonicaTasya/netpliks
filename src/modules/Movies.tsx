"use client";
import { useFavorites } from "../components/Context/FavoriteContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "../components/Layout/Card";
import { Button } from "../components/Layout/Button";

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
    const { favorites } = useFavorites();

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
        <div>
            {/* Tombol Filter - Mengubah State */}
            <div className="mb-4 flex gap-2">
                <Button variant="glass" onClick={() => setSelectedGenre("")}>
                    All
                </Button>
                <Button variant="glass" onClick={() => setSelectedGenre("28")}>
                    Action
                </Button>
                <Button variant="glass" onClick={() => setSelectedGenre("35")}>
                    Comedy
                </Button>
                <Button variant="glass" onClick={() => setSelectedGenre("18")}>
                    Drama
                </Button>
                <Button variant="glass" onClick={() => setSelectedGenre("27")}>
                    Horror
                </Button>
                <Button variant="glass" onClick={() => setSelectedGenre("10749")}>
                    Romance
                </Button>
                <Link href="/favorites">
                    <Button variant="glass">Lihat Favorit ({favorites.length})</Button>
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
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-15">
                    {displayedMovies.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
