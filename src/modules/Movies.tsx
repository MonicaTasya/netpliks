"use client";
import { useState, useEffect } from "react";
import Card from "../components/Layout/Card";
import { Button } from "../components/Layout/Button";

interface Movie {
    id: number;
    title: string;
}

interface Genre {
    id: number;
    name: string;
}
const genres: Genre[] = [
    {
        id: 28,
        name: "Action",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 99,
        name: "Dokumentarfilm",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 14,
        name: "Fantasy",
    },
    {
        id: 36,
        name: "Historie",
    },
    {
        id: 27,
        name: "Horror",
    },
    {
        id: 10402,
        name: "Musik",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 878,
        name: "Science Fiction",
    },
    {
        id: 53,
        name: "Thriller",
    },
];

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedGenre, setSelectedGenre] = useState(""); // State untuk filter
    const [searchTerm, setSearchTerm] = useState(""); // State untuk search
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [loading, setLoading] = useState(true);

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
            <div className="scrollbar-hide mb-4 flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden">
                {genres.map((genre) => (
                    <Button
                        key={genre.id}
                        variant="glass"
                        isActive={selectedGenre === genre.id.toString()}
                        onClick={() => setSelectedGenre(genre.id.toString())}>
                        {genre.name}
                    </Button>
                ))}
            </div>

            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari..."
                className="mb-4 w-full rounded-lg border border-gray-600 bg-black/30 p-2 text-white shadow-xl backdrop-blur-md"
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
