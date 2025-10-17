import comprarEntradas from "../src/compraEntradas.js";
import { describe, expect, test } from "@jest/globals";

describe("Pruebas para la función compraEntradas", () => {
  test("Compra Valida con tarjeta y fecha correcta", async () => {
    const resultado = await comprarEntradas({
      fecha: "2025-12-16",
      cantidad: 3,
      edades: [25, 30, 12],
      tipoPase: "VIP",
      formaPago: "tarjeta",
      email: "usuario@test.com",
    });

    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toMatch("Compra confirmada");
  });


});
