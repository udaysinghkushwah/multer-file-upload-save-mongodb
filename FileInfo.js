var mongoose  =  require('mongoose');  
  
var excelSchema = new mongoose.Schema({  
    Name:{  
        type:String  
    },  
    Email:{  
        type:String  
    },    
    Phone:{  
        type:Number  
    }
});  
  
module.exports = mongoose.model('fileInfo',excelSchema);  
