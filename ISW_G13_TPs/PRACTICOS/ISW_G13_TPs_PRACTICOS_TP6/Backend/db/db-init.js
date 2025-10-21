import sequelize from './db.js';
import Compra from '../models/compra.js';
import Entrada from '../models/entrada.js';

Compra.hasMany(Entrada, {
  foreignKey: "id_compra",
  as: "entradas",
});

Entrada.belongsTo(Compra, {
  foreignKey: 'id_compra',
  as: 'compra'
});

async function dbInit() {
  const forceSync = process.env.NODE_ENV === 'test';

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: forceSync });
    console.log(`Modelos sincronizados (Force: ${forceSync})`);
  }
  catch (error) {
    console.error("Error al sincronizar:", error);
  }
}

export default dbInit;