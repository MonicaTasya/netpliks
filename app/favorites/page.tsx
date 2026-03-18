"use client";
import { useFavorites } from "@/src/components/Context/FavoriteContext";

export default function FavoritesPage() {
    const { favorites, removeFromFavorite } = useFavorites();

    return (
        <div className="p-8">
            <h1 className="mb-4 text-2xl font-bold">Film Favorit Saya</h1>
            {favorites.length === 0 ? (
                <p>Belum ada film favorit.</p>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {favorites.map((movie) => (
                        <div key={movie.id} className="rounded border bg-slate-800 p-4">
                            <h2 className="text-lg font-semibold">{movie.title}</h2>
                            <button
                                onClick={() => removeFromFavorite(movie.id)}
                                className="mt-2 block text-red-400 underline">
                                Hapus
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
