import { Route, Routes } from "react-router";
import MainLayout from "./components/MainLayout";
import Home from "./views/Home";
import Login from "./views/Auth/Login";
import Auth from "./views/Auth";
import CompraEntradas from "./views/CompraEntradas";


function App() {
    return (
        <>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index path="/" element={<Home />} />
                    <Route path="compra" element={<CompraEntradas />}></Route>
                </Route>

                <Route path="auth" element={<Auth />}>
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
