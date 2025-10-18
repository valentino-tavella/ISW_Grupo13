import { comprarEntradas } from "../src/comprarEntradas.js";
import { describe, expect, test } from "@jest/globals";

describe("Pruebas para la función compraEntradas", () => {
  test("Compra Valida con tarjeta y fecha correcta", async () => {
    const resultado = await comprarEntradas({
      fecha: "2025-10-21",
      cantidad: 3,
      edades: [25, 30, 12],
      tipoPase: "VIP",
      formaPago: "tarjeta",
      email: "carla.gomez@hotmail.com",
    });

    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toMatch("Compra confirmada");
  });

  test("Falla si no se selecciona forma de pago", async () => {
    await expect(
      comprarEntradas({
        fecha: "2025-10-21",
        cantidad: 3,
        edades: [25, 30, 12],
        tipoPase: "regular",
        formaPago: "",
        email: "carla.gomez@hotmail.com",
      })
    ).rejects.toThrow("Debe seleccionar una forma de pago");
  });

  test("Falla si se intentan comprar más de 10 entradas", async () => {
    await expect(
      comprarEntradas({
        cantidad: 11,
        fecha: "2025-10-21",
        edades: [25, 30, 12, 22, 23, 24, 25, 26, 27, 28, 29],
        tipoPase: "VIP",
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
      })
    ).rejects.toThrow("La cantidad de entradas no puede ser mayor que 10.");
  });

  test("Falla si el parque está cerrado (Lunes)", async () => {
    await expect(
      comprarEntradas({
        fecha: "2025-10-20",
        cantidad: 2,
        edades: [20, 22],
        tipoPase: "regular",
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
      })
    ).rejects.toThrow("El parque está cerrado ese día");
  });

  test("Falla si el parque está cerrado (Navidad)", async () => {
    await expect(
      comprarEntradas({
        fecha: "2025-12-25",
        cantidad: 2,
        edades: [20, 22],
        tipoPase: "regular",
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
      })
    ).rejects.toThrow("El parque está cerrado ese día");
  });

  test("Falla si el parque está cerrado (Año Nuevo)", async () => {
    await expect(
      comprarEntradas({
        fecha: "2026-01-01",
        cantidad: 4,
        edades: [30, 32, 5, 8],
        tipoPase: "VIP",
        formaPago: "tarjeta",
        email: "carla.gomez@hotmail.com",
      })
    ).rejects.toThrow("El parque está cerrado ese día");
  });

  test("Debe fallar si la fecha ingresada es anterior a la actual", async () => {
    const fechaPasada = new Date();
    fechaPasada.setDate(fechaPasada.getDate() - 1);

    await expect(
      comprarEntradas({
        fecha: fechaPasada.toISOString().split("T")[0],
        cantidad: 2,
        edades: [20, 25],
        tipoPase: "regular",
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
      })
    ).rejects.toThrow("La fecha no puede ser pasada");
  });

});
