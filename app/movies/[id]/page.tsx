"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavorites } from "@/src/components/Context/FavoriteContext";
import Image from "next/image";

interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    backdrop_path: string;
}

export default function MovieDetailPage() {
    const { id } = useParams(); // Mengambil ID dari URL /movies/123
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const { isFavorite, addToFavorite, removeFromFavorite } = useFavorites();

    useEffect(() => {
        async function fetchDetail() {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
                headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` },
            });
            const data = await res.json();
            setMovie(data);
            setLoading(false);
        }
        if (id) fetchDetail();
    }, [id]);

    if (loading) return <div className="p-8 text-white">Memuat Detail Film...</div>;
    if (!movie) return <div className="p-8 text-white">Film tidak ditemukan.</div>;

    return (
        <div className="mx-auto max-w-4xl p-8">
            <div className="flex gap-8">
                {/* Gambar Poster */}
                <Image
                    width={200}
                    height={450}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-64 rounded-lg shadow-lg"
                />

                {/* Detail Info */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">{movie.title}</h1>
                    <p className="text-gray-400">Rilis: {movie.release_date}</p>
                    <p className="leading-relaxed">
                        {movie.overview || "Deskripsi tidak tersedia."}
                    </p>

                    {/* Tombol Favorit (Sakti!) */}
                    <button
                        onClick={() =>
                            isFavorite(movie.id)
                                ? removeFromFavorite(movie.id)
                                : addToFavorite(movie)
                        }
                        className={`rounded-lg p-3 font-semibold transition-colors ${
                            isFavorite(movie.id)
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}>
                        {isFavorite(movie.id) ? "❤️ Hapus dari Favorit" : "🤍 Tambah ke Favorit"}
                    </button>
                </div>
            </div>
        </div>
    );
}
