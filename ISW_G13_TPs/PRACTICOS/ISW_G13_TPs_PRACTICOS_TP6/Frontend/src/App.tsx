import { Route, Routes } from "react-router";
import MainLayout from "./components/MainLayout";
import Home from "./views/Home";
import Login from "./views/Auth/Login";
import Auth from "./views/Auth";
import Entradas from "./views/Entradas";
import MockMercadoPago from "./views/MockMercadoPago";
function App() {
    return (
        <>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index path="/" element={<Home />} />
                    <Route path="/entradas" element={<Entradas />} />
                    <Route path="/pago/mercadopago" element={<MockMercadoPago />} />
                </Route>

                <Route path="auth" element={<Auth />}>
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
