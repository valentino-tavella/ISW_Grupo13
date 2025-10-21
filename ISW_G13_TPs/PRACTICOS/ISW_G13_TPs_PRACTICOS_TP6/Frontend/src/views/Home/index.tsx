import { useNavigate } from "react-router";

function Home() {
    const navigate = useNavigate()
    return (
        <div className="bg-light-green text-pakistan-green p-6 w-3xl max-w-9/10 rounded-md flex flex-col gap-4">
            <div>
                <h2 className="text-2xl font-semibold">
                    Viví la aventura natural
                </h2>
                <p>
                    Conectate con la naturaleza en EcoHarmony Park. Descubrí
                    senderos, animales y experiencias únicas para toda la
                    familia.
                </p>
            </div>
            <div>
                <button className="primary" onClick={() => navigate("/entradas")}>Comprar entradas</button>
            </div>
        </div>
    );
}

export default Home;
