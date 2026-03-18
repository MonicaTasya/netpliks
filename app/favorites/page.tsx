import Favorites from "@/src/modules/Favorites";
import DefaultLayout from "@/src/components/Layout/DefaultLayout";
import { NavbarResolver } from "@/src/components/Layout/NavbarResolver";

const page = () => {
    return (
        <section className="min-h-screen bg-red-900 dark:bg-gray-900 dark:text-white">
            <NavbarResolver />
            <DefaultLayout className="flex items-center justify-center">
                <Favorites />
            </DefaultLayout>
        </section>
    );
};

export default page;
