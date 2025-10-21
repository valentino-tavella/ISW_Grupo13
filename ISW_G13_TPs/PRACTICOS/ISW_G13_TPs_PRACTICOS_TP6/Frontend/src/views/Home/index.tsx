function Home() {
    return (
        <div className="bg-light-green text-pakistan-green p-6 w-3xl max-w-9/10 rounded-md flex flex-col gap-4">
            <div>
                <h2 className="text-2xl font-semibold">Explorá las Exhibiciones</h2>
                <p>
                    Descubrí los senderos naturales y conocé las especies
                    autóctonas en su hábitat.
                </p>
            </div>
            <div>
                <button className="primary">Comprar entradas</button>
            </div>
        </div>
    );
}

export default Home;
