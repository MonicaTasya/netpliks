import Movies from "@/src/modules/Movies";
import DefaultLayout from "@/src/components/Layout/DefaultLayout";
import { NavbarResolver } from "@/src/components/Layout/NavbarResolver";

const page = () => {
    return (
        <section className="min-h-screen">
            <NavbarResolver />
            <DefaultLayout className="flex items-center justify-center">
                <Movies />
            </DefaultLayout>
        </section>
    );
};

export default page;
