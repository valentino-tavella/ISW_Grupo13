import request from "supertest";
import app from "../app.js";
import { afterAll, beforeAll } from "@jest/globals";
import sequelize from "../db/db.js";
import dbInit from "../db/db-init.js";

describe("Endpoints de compra de entradas", () => {
  beforeAll(async () => {
    await dbInit();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  const ymd = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };
  const tomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  };
  const yesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
  };
  const nextWeekday = (targetDow) => {
    const d = new Date();
    const delta = (targetDow - d.getDay() + 7) % 7 || 7;
    d.setDate(d.getDate() + delta);
    return d;
  };
  const nextNewYear = () => {
    const now = new Date();
    const nextYear = now.getFullYear() + (now.getMonth() > 0 || (now.getMonth() === 0 && now.getDate() > 1) ? 1 : 0);
    return new Date(nextYear, 0, 1);
  };

  test("health check responde ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ ok: true, service: "entradas" }));
  });

  test("compra válida devuelve 201 y exito true", async () => {
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: "2025-12-18",
        formaPago: "tarjeta",
        email: "roberto.saldivia@gmail.com",
        entradas: [
          { edad_visitante: 25, tipoPase: "VIP" },
          { edad_visitante: 12, tipoPase: "regular" }
        ]
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining({ exito: true, mensaje: expect.any(String) }));
  });

  test("compra válida con efectivo devuelve 201", async () => {
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: ymd(tomorrow()),
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
        entradas: [
          { edad_visitante: 20, tipoPase: "regular" },
          { edad_visitante: 22, tipoPase: "regular" }
        ]
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining({ exito: true, mensaje: expect.any(String) }));
  });

  test("falla por forma de pago inválida", async () => {
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: "2025-12-18",
        formaPago: "",
        email: "carla.gomez@hotmail.com",
        entradas: [{ edad_visitante: 20, tipoPase: "regular" }],
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toEqual(expect.objectContaining({
      exito: false,
      mensaje: "Debe seleccionar una forma de pago",
    }));
  });

  test("falla por parque cerrado (Navidad)", async () => {
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: "2025-12-25",
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
        entradas: [{ edad_visitante: 20, tipoPase: "regular" }],
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toEqual(expect.objectContaining({
      exito: false,
      mensaje: "El parque está cerrado ese día",
    }));
  });

  test("falla si usuario no registrado", async () => {
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: "2025-12-18",
        formaPago: "tarjeta",
        email: "",
        entradas: [{ edad_visitante: 25, tipoPase: "regular" }],
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toEqual(expect.objectContaining({
      exito: false,
      mensaje: "Debe estar registrado para comprar entradas",
    }));
  });

  test("falla por parque cerrado (Lunes futuro)", async () => {
    const fechaLunes = ymd(nextWeekday(1));
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: fechaLunes,
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
        entradas: [{ edad_visitante: 20, tipoPase: "regular" }],
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toEqual(expect.objectContaining({
      exito: false,
      mensaje: "El parque está cerrado ese día",
    }));
  });

  test("falla por parque cerrado (Año Nuevo próximo)", async () => {
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: ymd(nextNewYear()),
        formaPago: "tarjeta",
        email: "carla.gomez@hotmail.com",
        entradas: [{ edad_visitante: 25, tipoPase: "VIP" }],
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toEqual(expect.objectContaining({
      exito: false,
      mensaje: "El parque está cerrado ese día",
    }));
  });

  test("falla por fecha pasada (dinámica)", async () => {
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: ymd(yesterday()),
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
        entradas: [{ edad_visitante: 20, tipoPase: "regular" }],
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toEqual(expect.objectContaining({
      exito: false,
      mensaje: "La fecha no puede ser pasada",
    }));
  });

  test("falla si se intentan comprar más de 10 entradas", async () => {
    const entradasInvalidas = Array(11).fill({ edad_visitante: 25, tipoPase: "VIP" });
    const res = await request(app)
      .post("/api/entradas/comprar")
      .send({
        fecha: ymd(tomorrow()),
        formaPago: "efectivo",
        email: "carla.gomez@hotmail.com",
        entradas: entradasInvalidas,
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toEqual(expect.objectContaining({
      exito: false,
      mensaje: "La cantidad de entradas no puede ser mayor que 10.",
    }));
  });

  test("body vacío retorna error de usuario", async () => {
    const res = await request(app)
      .post("/api/entradas/comprar")
      .set("Content-Type", "application/json")
      .send({});

    expect(res.status).toBe(400);
    const possibleErrorMessages = [
      "Debe estar registrado para comprar entradas",
      "Debe seleccionar al menos una entrada"
    ];
    expect(possibleErrorMessages).toContain(res.body.mensaje);
  });
});

