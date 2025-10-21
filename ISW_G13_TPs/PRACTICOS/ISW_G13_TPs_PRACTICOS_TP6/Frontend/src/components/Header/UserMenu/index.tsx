import { Link } from "react-router";

function UserMenu() {
    const isLogin = false;

    if (isLogin) return <>Hola Lucía</>;

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
