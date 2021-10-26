# Inicio de proyecto Express

## Proyecto en el que gestionamos una base de datos en la que se guardan recetas de cocina. Existen las tablas **ingredients**, **recipes** y **contains**. Tanto la tabla ingredients como la tabla recipes se relacionan con la tabla contains en una relación 1:N.

## Pre-requisitos del proyecto:

* Instalamos **Nodejs** en nuestro equipo, descargándolo de su página oficial
https://nodejs.org/

* Clonamos el proyecto en nuestro equipo con git bash:
```
$git clone 'url-del-repositorio'
```

* Instalamos todas las dependecias con el siguiente comando:
```
npm install
```

## Creación de la base de datos

Tras modificar el archivo /config/config.json con los datos de nuestro servidor mysql (username, password, database y host), ejecutaremos los siguientes comandos:
* **Creación de la base de datos**:
```
sequelize db:create
```
* **Creación de las tablas**:
```
sequelize db:migrate
```
* **Creación de los registros**:
```
sequelize db:seed:all
```

## Uso de la API

Botón para usar la colección de postman, en donde están todos los endpoints para poder manipular la base de datos: [![Ejecutar en Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/11138723-d2394b28-e83f-46c3-91ec-a24a1f2de6d6?action=collection%2Ffork&collection-url=entityId%3D11138723-d2394b28-e83f-46c3-91ec-a24a1f2de6d6%26entityType%3Dcollection%26workspaceId%3Df063660d-fd06-4b33-a75b-f9e5a3dfcbcd)

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
* **sequelize**: Instalamos sequelize en nuestro proyecto, haciendo que podamos conectarnos y manipular la base de datos.
```
npm install sequelize-cli -g
npm install --save sequelize mysql2 sequelize-cli
sequelize init
```
## Explicación de la estructura del proyecto

Usamos el modelo vista-controlador para estructurar el proyecto. **Creamos un CRUD básico**. En el proyecto existirá la siguiente estructura:

* **index.js**: Este es el archivo principal. En este archivo se llama al archivo de las rutas, se gestiona la creación de logs, se gestiona la ruta inicial (/) y se arranca el servidor.

* **config**
    * **winston.js**: En este archivo se crea la configuración para que se guarden los logs de la aplicación.
    * **config.json**: En este archivo se gestiona la configuración para conectar con la base de datos. Se crea de manera automática con **sequelize**.

* **logs**: Dentro de este directorio se crea el archivo de logs.

* **db.js**: En este archivo se gestiona el acceso a la base de datos.

* **router.js**: En este archivo se gestiona las diferentes vistas que puede tener la aplicación. Se creará una ruta por cada tabla de la base de datos a la que queramos acceder (Ingrediente, Recipes y Contains).

* **views**
    * **IngredientRouter.js**: En este archivo gestionamos la ruta /ingredients. Cada endpoint dentro de esa ruta llamará a una función.
    * **RecipeRouter.js**: En este archivo gestionamos la ruta /recipes. Cada endpoint dentro de esa ruta llamará a una función.
    * **ContainRouter.js**: En este archivo gestionamos la ruta /contains. Cada endpoint dentro de esa ruta llamará a una función.

* **controllers**
    * **IngredientController.js**: En este archivo creamos cada función que usarán los endpoints. Se añaden aquí las funciones del controller, que acceden a las funciones del modelo.
    * **RecipeController.js**: En este archivo creamos cada función que usarán los endpoints. Se añaden aquí las funciones del controller, que acceden a las funciones del modelo.
    * **ContainController.js**: En este archivo creamos cada función que usarán los endpoints. Se añaden aquí las funciones del controller, que acceden a las funciones del modelo.

* **migrations**
    * **01-create-ingredient.js**: Al introducir el comando sequelize model:generate --name ingredient --attributes nombre:string se genera este archivo, y se crea la estructura de datos que tendrá la tabla ingredients (se genera con otro nombre, pero se lo cambio para controlar el orden de ejecución de estos archivos, ya que sequelize los lee y los ejecuta por orden alfabético).
    * **02-create-recipe.js**: Al introducir el comando sequelize model:generate --name recipe --attributes nombre:string,descripcion:string se genera este archivo, y se crea la estructura de datos que tendrá la tabla recipes (se genera con otro nombre, pero se lo cambio para controlar el orden de ejecución de estos archivos, ya que sequelize los lee y los ejecuta por orden alfabético).
    * **03-create-contain.js**: Al introducir el comando sequelize model:generate --name contain --attributes cantidad:string se genera este archivo, y se crea la estructura de datos que tendrá la tabla contain (se genera con otro nombre, pero se lo cambio para controlar el orden de ejecución de estos archivos, ya que sequelize los lee y los ejecuta por orden alfabético). En este archivo se añaden los campos que serán FK de las otras 2 tablas de la base de datos.

* **models**
    * **index.js**: Gestiona la conexión con la base de datos.
    * **ingredient.js**: Archivo creado al usar el comando sequelize model:generate... En este archivo está creado el esquema de datos que sigue la tabla ingredients de la base de datos. En este archivo añadimos también que su PK será FK de la tabla contains, y el nombre que llevará esa FK en esa tabla.
    * **recipe.js**: Archivo creado al usar el comando sequelize model:generate... En este archivo está creado el esquema de datos que sigue la tabla recipes de la base de datos. En este archivo añadimos también que su PK será FK de la tabla contains, y el nombre que llevará esa FK en esa tabla.
    * **contain.js**: Archivo creado al usar el comando sequelize model:generate... En este archivo está creado el esquema de datos que sigue la tabla contains de la base de datos. En este archivo añadimos también que tendrá 2 FK, y le indicamos de que tablas vienen esas columnas.

* **seeders**:
    * **01-demo-ingredient**: Se genera plantilla para la creación de registros para la tabla ingredient, tras introducir el comando sequelize seed:generate --name demo-ingredient.
    * **02-demo-recipe**: Se genera plantilla para la creación de registros para la tabla ingredient, tras introducir el comando sequelize seed:generate --name demo-ingredient.
    * **03-demo-contain**: Se genera plantilla para la creación de registros para la tabla ingredient, tras introducir el comando sequelize seed:generate --name demo-ingredient.

* **¡IMPORTANTE!** --> Creamos el archivo **.gitignore**, e incluimos lo siguiente (esencial para no subir la carpeta **node_modules** a github cuando hagamos push a nuestros archivos, entre otros):
```
/node_modules
/logs
package-lock.json
```