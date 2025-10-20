import express from "express";
import { comprarEntradas } from "../services/comprarEntradas.js";
import dbInit from "./db/db-init.js";
import router from "../controllers/compraEntradaController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

// Manejo 404
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Iniciar servidor solo si se ejecuta directamente
if (process.argv[1] && process.argv[1].endsWith("app.js")) {
  (async () => {
    await dbInit();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })();
}

export default app;
