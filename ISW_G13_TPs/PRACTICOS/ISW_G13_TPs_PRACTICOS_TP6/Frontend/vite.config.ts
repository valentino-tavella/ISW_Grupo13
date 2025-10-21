import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    // --- SECCIÓN AGREGADA ---
    // Aquí añadimos la configuración del proxy para evitar errores de CORS.
    server: {
        proxy: {
          // Cualquier petición que empiece con '/api' será redirigida
          // al servidor backend que corre en http://localhost:4000
          '/api': {
            target: 'http://localhost:3000', // IMPORTANTE: Cambia esto si tu backend corre en otro puerto
            changeOrigin: true,
            secure: false,
          },
        },
    },
});
