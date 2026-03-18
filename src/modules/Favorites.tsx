"use client";
import { useFavorites } from "../components/Context/FavoriteContext";
import Card from "../components/Layout/Card";
import { Button } from "../components/Layout/Button";
import { ArrowLeft } from "lucide-react";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div>
            <div className="flex flex-row items-center gap-2">
                <Button variant="glass" onClick={() => (window.location.href = "/movies")}>
                    <ArrowLeft /> Kembali
                </Button>
                <h1 className="mb-4 text-2xl font-bold">Film Favorit Saya</h1>
            </div>
            {favorites.length === 0 ? (
                <p>Belum ada film favorit.</p>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {favorites.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
