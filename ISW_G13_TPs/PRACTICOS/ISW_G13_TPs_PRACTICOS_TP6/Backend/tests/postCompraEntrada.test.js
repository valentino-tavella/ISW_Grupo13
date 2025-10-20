import request from "supertest";
import app from "../src/app.js";

describe("Endpoints de compra de entradas", () => {
  const ymd = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const tomorrow = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 1);
    return d;
  };

  const yesterday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - 1);
    return d;
  };

  const nextWeekday = (targetDow /* 0=Dom ... 6=Sab */) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const delta = (targetDow - d.getDay() + 7) % 7 || 7; // siempre futuro
    d.setDate(d.getDate() + delta);
    return d;
  };

  const nextNewYear = () => {
    const now = new Date();
    const nextYear =
      now.getFullYear() +
      (now.getMonth() > 0 || (now.getMonth() === 0 && now.getDate() > 1)
        ? 1
        : 0);
    return new Date(nextYear, 0, 1);
  };
  test("health check responde ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({ ok: true, service: "entradas" })
    );
  });

  test("compra válida devuelve 201 y exito true", async () => {
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: "2025-10-21",
        cantidad: 3,
        edades: [25, 30, 12],
        tipoPase: "VIP",
        formaPago: "tarjeta",
        email: "carla.gomez@hotmail.com",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({ exito: true, mensaje: expect.any(String) })
    );
  });

  test("compra válida con efectivo devuelve 201", async () => {
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: ymd(tomorrow()),
        cantidad: 2,
        edades: [20, 22],
        tipoPase: "regular",
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({ exito: true, mensaje: expect.any(String) })
    );
  });

  test("falla por forma de pago inválida", async () => {
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: "2025-10-21",
        cantidad: 2,
        edades: [20, 22],
        tipoPase: "regular",
        formaPago: "",
        email: "carla.gomez@hotmail.com",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        exito: false,
        mensaje: "Debe seleccionar una forma de pago",
      })
    );
  });
});
