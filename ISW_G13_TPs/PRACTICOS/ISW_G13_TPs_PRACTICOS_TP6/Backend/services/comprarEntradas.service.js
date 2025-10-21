// services/comprarEntradas.service.js

import { verificarFecha } from "../utils/verificarFecha.js";
import { usuariosMock } from "../mocks/usuario.mock.js";
import Compra from "../models/compra.js";
import Entrada from "../models/entrada.js";
import { enviarMailConfirmacion } from "./email.service.js";

const PRECIOS = {
  VIP: 10000,
  regular: 5000,
};

export const comprarEntradas = async (datosCompra) => {
  const usuario = usuariosMock.find((u) => u.email === datosCompra.email);
  if (!usuario) throw new Error("Debe estar registrado para comprar entradas");

  if (!datosCompra.formaPago || datosCompra.formaPago === "") {
    throw new Error("Debe seleccionar una forma de pago");
  }

  const formasDePagoPermitidas = ["tarjeta", "efectivo"];
  if (!formasDePagoPermitidas.includes(datosCompra.formaPago)) {
    throw new Error("Debe seleccionar una forma de pago válida");
  }

  if (!datosCompra.entradas || datosCompra.entradas.length === 0) {
    throw new Error("Debe seleccionar al menos una entrada");
  }
  if (datosCompra.entradas.length > 10) {
    throw new Error("La cantidad de entradas no puede ser mayor que 10.");
  }

  verificarFecha(datosCompra.fecha);

  let totalSuma = 0;
  for (const entrada of datosCompra.entradas) {
    const precio = PRECIOS[entrada.tipoPase];
    if (!precio) {
      throw new Error(`Tipo de pase inválido: ${entrada.tipoPase}`);
    }
    totalSuma += precio;
  }


  const createCompra = await Compra.create({
    fecha_compra: new Date(),
    total: totalSuma, 
    mail_comprador: datosCompra.email,
    tipo_pago: datosCompra.formaPago,
  });

  for (const entrada of datosCompra.entradas) {
    await Entrada.create({
      id_compra: createCompra.id,
      edad_visitante: entrada.edad_visitante,
      tipo: entrada.tipoPase,
      precio: PRECIOS[entrada.tipoPase], 
      fecha_visita: datosCompra.fecha, 
    });
  }

  enviarMailConfirmacion(datosCompra);

  return {
    exito: true,
    mensaje: "Compra confirmada",
    fecha: datosCompra.fecha,
    cantidad: datosCompra.entradas.length, 
    entradas: datosCompra.entradas, 
    formaPago: datosCompra.formaPago,
    email: datosCompra.email,
    total: totalSuma,
  };
};