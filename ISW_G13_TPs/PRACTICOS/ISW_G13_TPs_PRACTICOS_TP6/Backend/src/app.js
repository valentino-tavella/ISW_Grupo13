import express from "express";
import { comprarEntradas } from "./comprarEntradas.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "entradas", version: "1.0.0" });
});

// Endpoint para comprar entradas
app.post("/api/entradas/comprar", async (req, res) => {
  try {
    const resultado = await comprarEntradas(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({
      exito: false,
      mensaje: error?.message || "Error al procesar la compra",
    });
  }
});

// Manejo 404
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Iniciar servidor solo si se ejecuta directamente
if (process.argv[1] && process.argv[1].endsWith("app.js")) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

export default app;
