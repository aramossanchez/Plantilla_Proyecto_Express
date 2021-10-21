# Inicio de proyecto Express
## Pre-requisitos del proyecto:
* Instalamos **Nodejs** en nuestro equipo, descargándolo de su página oficial
https://nodejs.org/
<br>

* Iniciamos un proyecto **node** en el directorio elegido:
```
npm init
```

## Tecnologías utilizadas en el proyecto:
* **express**: Instalamos express en nuestro proyecto:
```
npm install express
```
* **axios**: Instalamos axios en nuestro proyecto:
```
npm install axios
```
* **nodemon**: Instalamos nodemon en nuestro proyecto. También añadimos en nuestro **package.json** un script para poder ejecutarlo:
```
npm install nodemon
```
```
//AÑADIDO EN PACKAGE.JSON
"dev": "nodemon index.js"
```
```
//EJECUTAMOS EN TERMINAL
npm run dev
```
* **colors**: Instalamos colors en nuestro proyecto, para poder dar formato a los mensajes que aparezcan en consola.
```
npm install colors
```
* **morgan**: Instalamos morgan en nuestro proyecto, para poder mostrar mensajes por terminal al realizar peticiones al servidor.
```
npm install morgan
```
* **winston**: Instalamos winston en nuestro proyecto, creando la posibilidad de generar logs y guardarlos.
```
npm install wiston
```
## Explicación de la estructura del proyecto
Usamos el modelo vista-controlador para estructurar el proyecto. **Creamos un CRUD básico**. En el proyecto existirá la siguiente estructura:
* **index.js**: Este es el archivo principal. En este archivo se llama al archivo de las rutas, se gestiona la creación de logs, se gestiona la ruta inicial (/) y se arranca el servidor.
* **router.js**: En este archivo se gestiona las diferentes vistas que puede tener la aplicación. Se creará una ruta por cada tabla de la base de datos a la que queramos acceder.
* **views --> MovieRouter.js**: En este archivo gestionamos la ruta /movies. Cada endpoint dentro de esa ruta llamará a una función.
* **controllers --> MovieControllers.js**: En este archivo creamos cada función que usarán los endpoints. Se añaden aquí las funciones del controller, que acceden a las funciones del modelo.
* **models --> MovieModel.js**: En este archivo creamos las funciones que acceden a los datos de la base de datos.
* **config --> winston.js**: En este archivo se crea la configuración para que se guarden los logs de la aplicación.
* **logs**: Dentro de este directorio se crea el archivo de logs.

## Creación de la estructura del proyecto
* **index.js**: creamos el archivo con el siguiente contenido: 
```
const express = require ("express");
const colors = require("colors");
const morgan = require("morgan");
const logger = require("./config/winston.js");
const router = require ("./router.js");
const app = express();
const PORT = 3000;

app.use(morgan("combined", {stream: logger.stream}));
app.use(express.json());

app.get("/", (req, res) => res.send("Bienvenido a Express") );

app.use(router);

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`.bgBlue.white);
});
```
* **config**: creamos la carpeta **config**, y en ella el archivo **winston.js**:
    * **winston.js**: en este archivo añadimos lo siguiente:
    ```
    const winston = require("winston");
    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: 'logs/log-file.log' }),
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.timestamp(), winston.format.json()
        ),
        exitOnError: false,
    });
    logger.stream = {
        write: function(message, encoding) {
            logger.info(message);
        }
    }
    module.exports = logger;
    ```
* **logs**: creamos la carpeta **logs**
* **router.js**: creamos el archivo y añadimos lo siguiente:
```
const MovieRouter = require("./views/MovieRouter.js");
const router = require("express").Router();

router.use("/movies", MovieRouter);

module.exports = router;
```
* **views**: creamos la carpeta **views**, y en ella el archivo siguiente:
    * **MovieRouter.js**: en este archivo añadimos lo siguiente:
    ```
    const expresss = require ("express");
    const router = expresss.Router();

    const MovieController = require ("../controllers/MovieController.js");

    router.get("/", MovieController.getAll);

    router.get("/:id", MovieController.getById);

    router.post("/", MovieController.postMovie);

    router.put("/:id", MovieController.updateMovie);

    router.delete("/:id", MovieController.deleteMovie);

    module.exports = router;
    ```
* **controllers**: creamos la carpeta **controllers**, y en ella el archivo siguiente:
    * **MovieController**: en este archivo añadimos lo siguiente:
    ```
    const movies = require("../models/MovieModel.js");

    const MovieController = {};

    MovieController.getAll =  (req, res) =>{
        res.json(movies.findAll());
    };

    MovieController.getById = (req,res) =>{
        res.json(movies.findById(req.params.id));
    };

    MovieController.postMovie = (req, res) =>{
        const id = req.body.id;
        const title = req.body.title;
        res.json(movies.post({id, title}));
    };

    MovieController.updateMovie = (req,res) => {
        const id = req.params.id;
        const body = req.body;
        res.json(movies.update({id, ...body})); //SE ASIGNA DESDE EL PRIMER ELEMENTO DEL OBJETO (id) Y LUEGO SE PASA TODO LOS PARAMETROS QUE ENTRARAN POR EL BODY. SE HACE CON LOS ... (...body)
    };

    MovieController.deleteMovie = (req,res) =>{
        res.send(movies.delete(req.params.id));
    }

    module.exports = MovieController;
    ```
* **models**: creamos la carpeta **models**, y en ella el archivo siguiente:
    * **MovieModel**: en este archivo añadimos lo siguiente:
    ```
    let db = require('../db.js');

    MovieModel = {};

    //DEFINO FUNCIONES
    MovieModel.findAll = () => db;

    MovieModel.findById = (id) => db.find(movie => movie.id == id);

    MovieModel.post = (newMovie) => {
        db.push(newMovie);
        return newMovie;
    };

    MovieModel.update = (newMovie) =>{
        let movies = db.filter(movie => movie.id != newMovie.id);
        movies.push(newMovie);
        db = movies;
        return newMovie;
    };

    MovieModel.delete = (id) =>{
        let movies = db.filter(movie => movie.id != id);
        db = movies;
        return `Registro ${id} eliminado correctamente`;
    };

    //EXPORTO
    module.exports = MovieModel;
    ```
* **db.js**: creamos el archivo (simulando una base de datos) y añadimos los siguientes datos de prueba:
```
module.exports = [
    {id: 1, title: "Soy leyenda"},
    {id: 2, title: "El risas"},
    {id: 3, title: "Yo robot"},
    {id: 4, title: "El hoyo"},
    {id: 5, title: "Matrix"}
];
```
**¡IMPORTANTE!** --> Creamos el archivo .gitignore, e incluimos lo siguiente (esencial para no subir la carpeta **node_modules** a github cuando hagamos push a nuestros archivos):
```
/node_modules
/logs
package-lock.json
```
## Prueba para saber si el proyecto funciona
Clonar el proyecto en local y ejecutar el siguiente comando (para instalar todos los modulos necesarios en tu equipo):
```
npm i
```
Iniciar el servidor con el comando:
```
npm run dev
```
Entrar en el navegador e indicar la siguiente url: http://localhost:3000/user (debe mostrarnos un objeto json).