"use client";
import { useFavorites } from "../components/Context/FavoriteContext";
import Card from "../components/Layout/Card";
import { Button } from "../components/Layout/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div>
            <div className="mb-10 flex flex-row items-center gap-2">
                <Link href="/movies">
                    <Button variant="glass">
                        <ArrowLeft /> Kembali
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-white">Film Favorit Saya</h1>
            </div>
            {favorites.length === 0 ? (
                <p className="text-center text-xl font-semibold">Belum ada film favorit.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-15">
                    {favorites.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
