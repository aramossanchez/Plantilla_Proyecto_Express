const express = require ("express");
const colors = require("colors");
const morgan = require("morgan");
const logger = require("./config/winston.js");
const router = require ("./router.js");
const app = express();
const PORT = 3000;

//MIDDLEWARE --> SE EJECUTARÁ SIEMPRE ANTES DE HACER CUALQUIER FUNCION DE APP
app.use(morgan("combined", {stream: logger.stream}));
app.use(express.json());// PERMITE ENVIAR Y RECIBIR JSON DEL BODY, ES IMPRESCINDIBLE

app.get("/", (req, res) => res.send("Bienvenido a Express") );

app.use(router);

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`.bgBlue.white);
});