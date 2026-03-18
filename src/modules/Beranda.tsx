import Card from "../components/Layout/Card";
import DefaultLayout from "../components/Layout/DefaultLayout";

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
        <section className="bg-red-900 dark:bg-gray-900 dark:text-white">
            <DefaultLayout className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-15">
                    {movies.map((movie: Movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            </DefaultLayout>
        </section>
    );
}
