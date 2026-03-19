import Details from "@/src/modules/Details";
import DefaultLayout from "@/src/components/Layout/DefaultLayout";
import { NavbarResolver } from "@/src/components/Layout/NavbarResolver";

const page = () => {
    return (
        <DefaultLayout>
            <NavbarResolver />
            <Details />
        </DefaultLayout>
    );
};

export default page;
