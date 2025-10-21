import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <Link to="/" className="bg-india-green px-2 py-1 rounded-md text-white font-bold transition hover:bg-pigment-green">
                <button className="primary" >Inicio</button>
            </Link>
        </>
    );
}

export default Navbar;
