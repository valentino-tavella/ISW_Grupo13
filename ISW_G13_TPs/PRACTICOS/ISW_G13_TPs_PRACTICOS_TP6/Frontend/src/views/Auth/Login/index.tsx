function Login() {
    return (
        <form className="text-xl flex flex-col gap-4">
            <div className="flex flex-col">
                <label>Usuario</label>
                <input type="text" />
            </div>

            <div className="flex flex-col">
                <label>Contraseña</label>
                <div className="flex gap-2">
                    <input type="password" />
                    <button className="primary">Ver</button>
                </div>
            </div>
            <div className="flex justify-end mt-5">
                <button type="button" className="primary">Ingresar</button>
            </div>
        </form>
    );
}

export default Login;
