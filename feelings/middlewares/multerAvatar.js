const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null,"public/images/users")
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname) )
    }
});

const uploadAvatar = multer({storage: storage});

module.exports = uploadAvatar;