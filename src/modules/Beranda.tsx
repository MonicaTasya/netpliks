import Card from "../components/Layout/Card";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { Button } from "../components/Layout/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
        cache: "no-store",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
    });

    if (!res.ok) throw new Error("Gagal ambil data");
    return res.json();
}

export default async function Beranda() {
    const data = await getData();
    const movies = data.results;

    return (
        <section>
            <DefaultLayout className="flex items-center justify-center">
                <div className="flex flex-row items-center gap-1">
                    <p className="p-4 text-3xl font-bold text-white">Trending</p>
                    <Link href="/movies">
                        <Button variant="glass">
                            {" "}
                            More <ArrowRight />
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-15">
                    {movies.map((movie: Movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            </DefaultLayout>
        </section>
    );
}
