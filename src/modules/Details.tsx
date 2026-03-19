"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavorites } from "../components/Context/FavoriteContext";
import Image from "next/image";
import { Button } from "../components/Layout/Button";
import { ArrowLeft, Bookmark } from "lucide-react";
import Link from "next/link";

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
    const favorite = isFavorite(movie?.id || 0);

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
        <div className="md:p-10">
            <Link href="/movies">
                <Button className="mb-5" variant="glass">
                    <ArrowLeft /> Kembali
                </Button>
            </Link>
            <div className="flex flex-col gap-8 rounded-xl bg-black p-20 lg:flex-row">
                {/* Gambar Poster */}
                <Image
                    width={200}
                    height={450}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-100 rounded-lg shadow-lg"
                />

                {/* Detail */}
                <div className="flex flex-col items-start justify-end">
                    <p className="text-lg font-bold text-red-500">NETPLIKS</p>
                    <h1 className="text-xl font-bold text-white md:text-4xl">{movie.title}</h1>
                    <p className="md:text-md text-sm text-gray-300">Rilis: {movie.release_date}</p>
                    {/* Tombol Favorit */}
                    <div className="my-5 flex flex-row gap-5">
                        <Link href="/favorites">
                            <Button variant="glass">Lihat Favorit</Button>
                        </Link>
                        <Button
                            variant="glass"
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
                    {/* Overview */}
                    <p className="leading-relaxed text-white">
                        {movie.overview || "Deskripsi tidak tersedia."}
                    </p>
                </div>
            </div>
        </div>
    );
}
