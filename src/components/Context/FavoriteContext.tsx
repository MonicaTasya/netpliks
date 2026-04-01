"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface Movie {
    id: number;
    title: string;
}

interface FavoriteContextType {
    favorites: Movie[];
    addToFavorite: (movie: Movie) => void;
    removeFromFavorite: (movieId: number) => void;
    isFavorite: (movieId: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    // Fungsi Tambah
    const addToFavorite = (movie: Movie) => {
        setFavorites((prev) => [...prev, movie]);
    };

    // Fungsi Hapus
    const removeFromFavorite = (movieId: number) => {
        setFavorites((prev) => prev.filter((m) => m.id !== movieId));
    };

    // Fungsi Cek favorit
    const isFavorite = (movieId: number) => {
        return favorites.some((m) => m.id === movieId);
    };

    return (
        <FavoriteContext.Provider
            value={{ favorites, addToFavorite, removeFromFavorite, isFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
}

// Hook buat manggil
export const useFavorites = () => {
    const context = useContext(FavoriteContext);
    if (!context) throw new Error("useFavorites harus di dalam FavoriteProvider");
    return context;
};
