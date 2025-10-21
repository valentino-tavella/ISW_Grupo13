import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ConfigProvider locale={esES}>
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </StrictMode>
);
