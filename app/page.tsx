import Beranda from "@/src/modules/Beranda";
import { NavbarResolver } from "@/src/components/Layout/NavbarResolver";

export default function Home() {
    return (
        <>
            <NavbarResolver />
            <Beranda />
        </>
    );
}
