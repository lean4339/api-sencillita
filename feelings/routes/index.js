var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/",(req,res)=>{
  res.json({
    mensaje:"Bienvenido a mi api"
  })
})

module.exports = router;
