import { verificarFecha } from "../utils/verificarFecha.js";
import { usuariosMock } from "../mocks/usuario.mock.js";

export const comprarEntradas = async (datosCompra) => {
  const usuario = usuariosMock.find((u) => u.email === datosCompra.email);
  if (!usuario) throw new Error("Debe estar registrado para comprar entradas");

  const formasDePagoPermitidas = ["tarjeta", "efectivo"];

  if (!formasDePagoPermitidas.includes(datosCompra.formaPago)) {
    throw new Error("Debe seleccionar una forma de pago");
  }
  
  if (datosCompra.cantidad > 10) {
    throw new Error("La cantidad de entradas no puede ser mayor que 10.");
  }

  verificarFecha(datosCompra.fecha);

  return {
      exito: true,
      mensaje: "Compra confirmada",
      fecha: datosCompra.fecha,
      cantidad: datosCompra.cantidad,
      edades: datosCompra.edades,
      tipoPase: datosCompra.tipoPase,
      formaPago: datosCompra.formaPago,
      email: datosCompra.email,
  };
};
