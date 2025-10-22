import images from "@/assets/images";
import Navbar from "./Navbar";
import UserMenu from "./UserMenu";

function Header() {
    return (
        <header className="w-full">
            <div className="m-auto w-6xl max-w-9/10 flex gap-2 justify-between min-h-[80px] items-center py-1">
                <div className="max-w-[350px]">
                    <img className="" src={images.logoEcoHarmonyParkNavMenu} alt="Logo de EcoHarmony Park" />
                </div>
                <div className="flex gap-2 text-xl">
                    <Navbar />
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}

export default Header;
