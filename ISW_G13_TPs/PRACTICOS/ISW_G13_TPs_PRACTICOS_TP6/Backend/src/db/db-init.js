import sequelize from './conexion.js';
import Compra from './models/compra.js';
import Entrada from './models/entrada.js';

// Definir las asociaciones para evitar dependencias circulares
Compra.hasMany(Entrada, {
  foreignKey: "id_compra",
  as: "entradas",
});

Entrada.belongsTo(Compra, {
  foreignKey: 'id_compra',
  as: 'compra'
});

async function dbInit() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Modelos sincronizados");
    }
    catch (error) {
        console.error("Error al sincronizar:", error);
    }
}

export default dbInit;