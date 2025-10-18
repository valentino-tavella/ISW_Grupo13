export const verificarFecha = (fecha) => {
  const fechaVisita = new Date(fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // Validar que no sea pasada
  if (fechaVisita < hoy) {
    throw new Error("La fecha no puede ser pasada");
  }

  // Validar que no sea lunes (cerrado)
  if (fechaVisita.getUTCDay() === 1) {
    throw new Error("El parque está cerrado ese día");
  }

  const esNavidad =
    fechaVisita.getUTCMonth() === 11 && fechaVisita.getUTCDate() === 25;
  const esAnioNuevo =
    fechaVisita.getUTCMonth() === 0 && fechaVisita.getUTCDate() === 1;

  if (esNavidad) {
    throw new Error("El parque está cerrado ese día");
  }

  if(esAnioNuevo){
    throw new Error("El parque está cerrado ese día");
  }
}
