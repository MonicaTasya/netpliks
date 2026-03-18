import Favorites from "@/src/modules/Favorites";
import DefaultLayout from "@/src/components/Layout/DefaultLayout";

const page = () => {
    return (
        <section className="min-h-screen bg-red-900 dark:bg-gray-900 dark:text-white">
            <DefaultLayout className="flex items-center justify-center">
                <Favorites />
            </DefaultLayout>
        </section>
    );
};

export default page;
