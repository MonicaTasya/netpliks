import Beranda from "@/src/modules/Beranda";
import { NavbarResolver } from "@/src/components/Layout/NavbarResolver";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Netpliks - Temukan Film Favoritmu",
    description:
        "Platfrom untuk mencari dan menyimpan film favoritmu, temukan berbagai film menarik dan buat daftar favoritmu dengan mudah di Netpliks!",
};

export default function Home() {
    return (
        <>
            <NavbarResolver />
            <Beranda />
        </>
    );
}
