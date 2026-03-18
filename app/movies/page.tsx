import Movies from "@/src/modules/Movies";
import DefaultLayout from "@/src/components/Layout/DefaultLayout";

const page = () => {
    return (
        <section className="min-h-screen bg-red-900 dark:bg-gray-900 dark:text-white">
            <DefaultLayout className="flex items-center justify-center">
                <Movies />
            </DefaultLayout>
        </section>
    );
};

export default page;
