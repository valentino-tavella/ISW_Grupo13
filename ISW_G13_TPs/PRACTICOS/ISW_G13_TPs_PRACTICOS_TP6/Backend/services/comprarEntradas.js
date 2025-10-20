import { verificarFecha } from "../utils/verificarFecha.js";
import { usuariosMock } from "../mocks/usuario.mock.js";
import Compra from "../src/db/models/compra.js";
import Entrada from "../src/db/models/entrada.js";

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

  if (datosCompra.cantidad > 10) {
    throw new Error("La cantidad de entradas no puede ser mayor que 10.");
  }

  verificarFecha(datosCompra.fecha);

  // Calcular el precio por entrada según el tipo de pase
  const precioPorEntrada = datosCompra.tipoPase === "VIP" ? 10000 : 5000;
  const suma = precioPorEntrada * datosCompra.cantidad;

  const createCompra = await Compra.create({
    fecha_compra: new Date(),
    total: suma,
    mail_comprador: datosCompra.email,
    tipo_pago: datosCompra.formaPago,
  });

  for (let i = 0; i < datosCompra.cantidad; i++) {
    await Entrada.create({
      id_compra: createCompra.id,
      edad_visitante: datosCompra.edades[i],
      tipo: datosCompra.tipoPase,
      precio: datosCompra.tipoPase === "VIP" ? 10000 : 5000,
      fecha_visita: datosCompra.fecha,
    });
  }

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
