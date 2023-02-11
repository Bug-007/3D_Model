const mongoose = require('mongoose');
// add link write password and /? k beech m database name daalna h 
const url = "mongodb+srv://utarora:mansha@cluster0.wmuj9.mongodb.net/3Dmodelsharing?retryWrites=true&w=majority"
// promise (asynchronous :-(multitask))
// connect karane k liye 
mongoose.connect(url)
.then(() => {
console.log('connected to database')
}).catch((err) => {
    console.log(err);
    
});
    //export because we use in different module 
module.exports = mongoose;