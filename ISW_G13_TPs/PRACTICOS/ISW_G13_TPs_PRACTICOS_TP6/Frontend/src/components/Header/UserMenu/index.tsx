import { useAuthStore } from "@/store/auth-store";
import { Link } from "react-router";

function UserMenu() {
    const { email, logout } = useAuthStore();

    if (email)
        return (
            <div className="flex items-center gap-2">
                <p>
                    Hola <span className="">{email.split("@")[0]}</span>!
                </p>
                <button className="primary" onClick={logout}>Cerrar sesión</button>
            </div>
        );

    return (
        <Link
            to={"/auth/login"}
            className="bg-india-green px-2 py-1 rounded-md text-white font-bold transition hover:bg-pigment-green"
        >
            Iniciar sesión
        </Link>
    );
}

export default UserMenu;
