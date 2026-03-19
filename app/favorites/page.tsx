import Favorites from "@/src/modules/Favorites";
import DefaultLayout from "@/src/components/Layout/DefaultLayout";
import { NavbarResolver } from "@/src/components/Layout/NavbarResolver";

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
