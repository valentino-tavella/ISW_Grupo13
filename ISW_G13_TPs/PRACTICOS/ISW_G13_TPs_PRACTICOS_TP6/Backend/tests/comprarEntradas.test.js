import { comprarEntradas } from "../services/comprarEntradas.service.js";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import dbInit from "../db/db-init.js";
import sequelize from "../db/db.js";

describe("Pruebas para la función compraEntradas", () => {
  beforeAll(async () => {
    await dbInit();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("Compra Valida con diferentes tipos de pase", async () => {
    const resultado = await comprarEntradas({
      fecha: "2025-12-18",
      formaPago: "tarjeta",
      email: "carla.gomez@hotmail.com",
      entradas: [
        { edad_visitante: 25, tipoPase: "VIP" },
        { edad_visitante: 30, tipoPase: "VIP" },
        { edad_visitante: 12, tipoPase: "regular" },
      ],
    });

    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toMatch("Compra confirmada");
    expect(resultado.total).toBe(25000);
  });

  test("Falla si no se selecciona forma de pago", async () => {
    await expect(
      comprarEntradas({
        fecha: "2025-12-18",
        formaPago: "",
        email: "carla.gomez@hotmail.com",
        entradas: [{ edad_visitante: 25, tipoPase: "regular" }],
      })
    ).rejects.toThrow("Debe seleccionar una forma de pago");
  });

  test("Falla si se intentan comprar más de 10 entradas", async () => {
    const entradasInvalidas = Array(11).fill({
      edad_visitante: 30,
      tipoPase: "VIP",
    });

    await expect(
      comprarEntradas({
        fecha: "2025-12-18",
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
        entradas: entradasInvalidas,
      })
    ).rejects.toThrow("La cantidad de entradas no puede ser mayor que 10.");
  });

  test("Falla si el parque está cerrado (Lunes)", async () => {
    await expect(
      comprarEntradas({
        fecha: "2025-10-27",
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
        entradas: [{ edad_visitante: 20, tipoPase: "regular" }],
      })
    ).rejects.toThrow("El parque está cerrado ese día");
  });

  test("Falla si el parque está cerrado (Navidad)", async () => {
    await expect(
      comprarEntradas({
        fecha: "2025-12-25",
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
        entradas: [{ edad_visitante: 20, tipoPase: "regular" }],
      })
    ).rejects.toThrow("El parque está cerrado ese día");
  });

  test("Falla si el parque está cerrado (Año Nuevo)", async () => {
    await expect(
      comprarEntradas({
        fecha: "2026-01-01",
        formaPago: "tarjeta",
        email: "carla.gomez@hotmail.com",
        entradas: [{ edad_visitante: 30, tipoPase: "VIP" }],
      })
    ).rejects.toThrow("El parque está cerrado ese día");
  });

  test("Debe fallar si la fecha ingresada es anterior a la actual", async () => {
    const fechaPasada = new Date();
    fechaPasada.setDate(fechaPasada.getDate() - 1);

    await expect(
      comprarEntradas({
        fecha: fechaPasada.toISOString().split("T")[0],
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
        entradas: [{ edad_visitante: 20, tipoPase: "regular" }],
      })
    ).rejects.toThrow("La fecha no puede ser pasada");
  });

  test("Debe fallar si el usuario no está registrado", async () => {
    await expect(
      comprarEntradas({
        fecha: "2025-12-18",
        formaPago: "tarjeta",
        email: "",
        entradas: [{ edad_visitante: 25, tipoPase: "regular" }],
      })
    ).rejects.toThrow("Debe estar registrado para comprar entradas");
  });
});
