import Image from "next/image";
import Link from "next/link";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    overview: string;
    release_date: string;
}

async function getData() {
    const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", {
        cache: "no-store", // Biar data selalu segar, nggak basi
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`, // Di server, gak perlu NEXT_PUBLIC_
        },
    });

    if (!res.ok) throw new Error("Gagal ambil data");
    return res.json();
}

export default async function Beranda() {
    const data = await getData(); // Langsung dapet datanya!
    const movies = data.results;

    return (
        <div className="flex items-center justify-between bg-black p-4 text-white">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-10">
                {movies.map((movie: Movie) => (
                    <div
                        key={movie.id}
                        className="overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-transform hover:scale-105">
                        <div className="relative">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || "No Title"}
                                width={500}
                                height={750}
                                className="h-70 w-full object-cover"
                            />
                            {/* Badge Rating di pojok gambar */}
                            <div className="absolute top-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-bold text-yellow-400">
                                ⭐ {movie.vote_average.toFixed(1)}
                            </div>
                        </div>

                        <Link href={`/movies/${movie.id}`} className="block">
                            <div className="p-3">
                                <h1 className="line-clamp-1 font-bold">{movie.title}</h1>
                                <p className="mt-1 text-xs text-gray-400">
                                    {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
