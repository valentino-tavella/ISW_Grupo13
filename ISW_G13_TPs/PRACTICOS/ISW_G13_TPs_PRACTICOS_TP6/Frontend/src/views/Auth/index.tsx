import images from "@/assets/images";
import { HouseIcon } from "@phosphor-icons/react";
import { Outlet, useNavigate } from "react-router";

function Auth() {
    const navigate = useNavigate();
    return (
        <div className="flex items-center w-full min-h-screen justify-center">
            <div className="bg-light-green border border-india-green rounded-md flex flex-col gap-2 items-center p-6 relative">
                <button
                    className="primary absolute top-0 left-0 translate-2"
                    onClick={() => navigate("/")}
                >
                    <HouseIcon weight="fill" size={24} />
                </button>
                <div className="flex items-center p-6 gap-1">
                    <img
                        className="max-w-[100px]"
                        src={images.logoEcoHarmonyPark}
                        alt="Logo de EcoHarmony Park"
                    />
                    <h1 className="mt-4 text-2xl">EcoHarmony Park</h1>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Auth;
