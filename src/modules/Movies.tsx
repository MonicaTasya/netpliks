"use client";
import { useState, useEffect } from "react";
import Card from "../components/Layout/Card";
import { Button } from "../components/Layout/Button";
import Skeleton from "../components/Layout/Skeleton";

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
    const [selectedGenre, setSelectedGenre] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);

            const url = selectedGenre
                ? `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}`
                : `https://api.themoviedb.org/3/discover/movie`;

            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` },
            });
            if (!res.ok) {
                console.error("Gagal ambil data:", res.statusText);
                setMovies([]);
                setLoading(false);
                return;
            }
            const data = await res.json();
            setMovies(data.results);
            setLoading(false);
        }

        fetchMovies();
    }, [selectedGenre]);

    const displayedMovies =
        movies.filter((m) => m.title.toLowerCase().includes(debouncedTerm.toLowerCase())) || [];

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    return (
        <div>
            {/* Tombol Filter */}
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

            {/*  Search Bar */}
            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari..."
                className="mb-4 w-full rounded-lg border border-gray-400 bg-white/10 p-2 text-white shadow-xl backdrop-blur-md dark:border-gray-600 dark:bg-black/30"
            />

            <p className="p-4 text-3xl font-bold text-white">
                {genres.find((g) => g.id.toString() === selectedGenre)?.name || "Trending"}
            </p>

            {loading ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-15">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-15">
                    {displayedMovies.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
            {!loading && displayedMovies.length === 0 && (
                <div className="py-20 text-center text-xl text-gray-500">
                    Yah, film yg kamu cari gak ketemu... :(
                </div>
            )}
        </div>
    );
}
