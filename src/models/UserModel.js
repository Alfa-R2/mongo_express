const mongoose=require("mongoose")

const userSchema= mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("UserModel", userSchema)