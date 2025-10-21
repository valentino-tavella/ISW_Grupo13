import Navbar from "./Navbar";
import UserMenu from "./UserMenu";

function Header() {
    return (
        <header className="w-full">
            <div className="m-auto w-6xl max-w-9/10 flex gap-2 justify-between min-h-[80px] items-center">
                <div className="">
                    <h1 className="text-4xl">EcoHarmony Park</h1>
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
