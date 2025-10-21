import express from "express";
import dbInit from "./db/db-init.js";
import router from "./routes/comprarEntradas.router.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

if (process.argv[1] && process.argv[1].endsWith("app.js")) {
  (async () => {
    await dbInit();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })();
}

export default app;
