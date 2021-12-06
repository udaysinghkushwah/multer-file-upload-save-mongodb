const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
var path        = require('path');  
var userModel    = require('./fileInfo');  
var excelToJson = require('convert-excel-to-json');
var bodyParser  = require('body-parser');  
var fs= require('fs');
var storage = multer.diskStorage({  
destination:(req,file,cb)=>{  
cb(null,'./public');  
},  
filename:(req,file,cb)=>{  
cb(null,file.originalname);  
}  
});  
var uploads = multer({storage:storage});  
//connect to db  
mongoose.connect('mongodb://localhost:27017/test-db',{useNewUrlParser:true})  
.then(()=>console.log('connected to db'))  
.catch((err)=>console.log(err))  
//init app  
var app = express();  

app.use(bodyParser.urlencoded({extended:false}));  
// Upload excel file and import to mongodb
app.post('/uploadfile', uploads.single("file"), (req, res) =>{
console.log(req);
importExcelData2MongoDB('./public/' + req.file.filename);

});
// Import Excel File to MongoDB database
function importExcelData2MongoDB(filePath){
    console.log(filePath)
// -> Read Excel File to Json Data
const excelData = excelToJson({
sourceFile: filePath,
sheets:[{
// Excel Sheet Name
name: 'Sheet1',
// Header Row -> be skipped and will not be present at our result object.
header:{
rows: 1
},
// Mapping columns to keys
columnToKey: {
A: 'Name',
B: 'Phone',
C: 'Email'
}
}]
});
// -> Log Excel Data to Console
console.log(excelData);

// Insert Json-Object to MongoDB
userModel.insertMany(excelData.Sheet1,(err,data)=>{  
if(err){  
console.log(err);  
}else{  
    console.log("File uploaded sucessfully")
    
}  
}); 
fs.unlinkSync(filePath);
}
//assign port  
var port = process.env.PORT || 3000;  
app.listen(port,()=>console.log('server run at port '+port)); 