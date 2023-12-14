//Importamos express y mongoose
const express= require("express");
const mongoose=require("mongoose");
require("dotenv").config();

//Requerimos el router definido en user.js 
const userRoutes=require("./routes/user")

//Declaramos e inicializamos la app
const app=express()
const port= process.env.PORT || 9000

//middleware 
//Le añadira el prefijo "/api" a todas las rutas de user
app.use(express.json())
app.use("/api",userRoutes);


//Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("Connected"))
    .catch((error)=>console.log(error))

//Escuchamos el puerto
app.listen(port,()=>console.log("Server escuchando",port))