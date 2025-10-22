// src/services/emailService.js
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();


// Configuración del "transporter" que usará Nodemailer para enviar el mail.
// Debes usar variables de entorno para las credenciales, NUNCA las escribas directamente.
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // Ej: 'smtp.sendgrid.net'
  port: process.env.EMAIL_PORT, // Ej: 587
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER, // Ej: 'apikey' para SendGrid
    pass: process.env.EMAIL_PASS, // La API Key de SendGrid
  },
});

// Función para enviar el mail de confirmación de compra
export const enviarMailConfirmacion = async (datosCompra) => {
  try {
    // Contenido del email
    const mailOptions = {
      from: `"ECO HARMONY PARK" <${process.env.EMAIL_FROM}>`, // Dirección del remitente
      to: datosCompra.email, // Email del comprador
      subject: '¡Confirmación de tu compra de entradas!', // Asunto
      html: `
        <h1>¡Gracias por tu compra, ${datosCompra.email}!</h1>
        <p>Tu visita para el día <strong>${datosCompra.fecha}</strong> ha sido confirmada.</p>
        <p>Detalles de la compra:</p>
        <ul>
          <li>Cantidad de entradas: ${datosCompra.entradas.length}</li>
          <li>Forma de pago: ${datosCompra.formaPago}</li>
        </ul>
        <p>¡Te esperamos!</p>
      `,
    };

    // Enviar el email
    const info = await transporter.sendMail(mailOptions);
    console.log('Mail de confirmación enviado:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info))
    return true;

  } catch (error) {
    console.error('Error al enviar el mail de confirmación:', error);
    // Es importante que si el mail falla, no detenga la compra.
    // Por eso solo lo logueamos y no lanzamos un error que frene el proceso.
    return false;
  }
};