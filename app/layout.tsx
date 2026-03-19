import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavoriteProvider } from "@/src/components/Context/FavoriteContext";
import { ThemeProvider } from "@/src/components/Context/ThemeContext";
import Navbar from "@/src/components/Layout/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Netpliks - Temukan Film Favoritmu",
    description:
        "Platfrom untuk mencari dan menyimpan film favoritmu, temukan berbagai film menarik dan buat daftar favoritmu dengan mudah di Netpliks!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-red-900 text-black antialiased dark:bg-gray-800 dark:text-white`}>
                <ThemeProvider>
                    <FavoriteProvider>
                        <Navbar />
                        {children}
                    </FavoriteProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
