//Importamos express y mongoose
const express= require("express");
const mongoose=require("mongoose");
require("dotenv").config();

//Importamos el modulo path del mismo node
const path= require("path");

//swagger
const swaggerUI= require("swagger-ui-express")
const swaggerJsDoc= require("swagger-jsdoc")
const swaggerEspec={
    definition:{
        openapi:"3.1.0", //Requerido
        info:{
            title:"Node MongoDB Api", //Requerido
            version:"1.0.0", //Requerido
        },
        servers: [
            {
                url: "http://localhost:9000"
            }
        ] 
    },
    // Le indicamos la ruta de las api elaboradas
    apis:[`${path.join(__dirname,"./routes/*.js")}`]
    // __dirnames una variable de entorno que le indica la ruta absoluta del directorio 
}

//Declaramos e inicializamos la app
const app=express()
const port= process.env.PORT || 9000

//Requerimos el router definido en user.js 
const userRoutes=require("./routes/user")

//middleware 
//Le añadira el prefijo "/api" a todas las rutas de user
app.use(express.json())
app.use("/api",userRoutes);
// En el middleware de api-doc montamos un server swagger y desplegamos un swagger doc
app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerEspec)))


//Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("Connected"))
    .catch((error)=>console.log(error))

//Escuchamos el puerto
app.listen(port,()=>console.log("Server escuchando",port))