const mongoose = require('mongoose');
const ProductShema= new mongoose.Schema({
    name:String,
    price:Number,
    page:Number,
    color:String
});

module.exports  = mongoose.model("items",ProductShema);