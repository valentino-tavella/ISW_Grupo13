import { Router } from "express";
import { comprarEntradas } from "../services/comprarEntradas.js";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "entradas", version: "1.0.0" });
});

// Endpoint para comprar entradas
router.post("/api/entradas/comprar", async (req, res) => {
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

export default router;
