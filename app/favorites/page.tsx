import Favorites from "@/src/modules/Favorites";
import DefaultLayout from "@/src/components/Layout/DefaultLayout";
import { NavbarResolver } from "@/src/components/Layout/NavbarResolver";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Simpan Film Favoritmu | NETPLIKS",
    description: "Kumpulan film-film pilihan yang sudah Anda simpan di NETPLIKS",
};

const page = () => {
    return (
        <section>
            <NavbarResolver />
            <DefaultLayout className="flex items-center justify-center">
                <Favorites />
            </DefaultLayout>
        </section>
    );
};

export default page;
