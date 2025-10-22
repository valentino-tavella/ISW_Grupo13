import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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
        <p>Tu visita para el día <strong>${new Date(datosCompra.fecha).toLocaleDateString('es-AR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</strong> ha sido confirmada.</p>
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
    // Si el email falla, no se cancela la compra, solo se notifica el error
    return false;
  }
};