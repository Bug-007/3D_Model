const {Schema,model} = require('../connection');

const myschema = new Schema({
    title : String,
    description : String,
    size: String,
    triangle:String,
    materials:String,
    vertices:String,
    uploadedBy:String,
    textures:String,
    image : String,
    file : String,
    createdAt: {type:Date,default:new Date()},
    category: String,
});

module.exports= model('3D',myschema);
