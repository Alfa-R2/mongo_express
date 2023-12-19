// Requerimos a express y declaramos una constante router
const express= require("express");
const router=express.Router();
const userModel=require("../models/UserModel")
// Esquemas
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The user name
 *              age:
 *                  type: integer
 *                  description: The user age 
 *              email:
 *                  type: string
 *                  description: The user email
 *          required:
 *              - name
 *              - age
 *              - email
 *          example:
 *              name:  Alan Wake
 *              age: 37
 *              email: alanWakeOficial@gmail.com
 */

// EndPoints
// 
router.get("/users",(request,response)=>{
    userModel.find()
    .then((data)=>response.json(data))
    .catch((error)=>response.json({"message":error}))
})

router.get("/user/:id",(request,response)=>{
    const {id}=request.params
    userModel.findById(id)
    .then((data)=>response.json(data))
    .catch((error)=>response.json({"message":error}))
})
//create user
/**
 * @swagger
 * /api/users
 * post:
 *  summary: create a new user
 *  tags: [User] 
 */
router.post("/users",(request,response)=>{
    const user=userModel(request.body);
    user.save()
    .then((data)=>response.json(data))
    .catch((error)=>response.json({"message":error}))
})

router.put("/user/:id", (request,response)=>{
    const {id}= request.params
    const {name,age,email}=request.body
    //Puedes hacer que lo encuentre por otro parametro
    userModel
    .updateOne({_id:id},{ $set:{name,age,email}})
    .then((data)=>response.json(data))
    .catch((error)=>response.json({"message":error}))
})

router.delete("/user/:id",(request,response)=>{
    const {id}=request.params
    userModel.deleteOne({_id:id})
    .then((data)=>response.json(data))
    .catch((error)=>response.json({"message":error}))
})

module.exports=router;