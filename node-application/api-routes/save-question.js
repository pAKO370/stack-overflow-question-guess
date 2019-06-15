const Express = require("express");
const Router = Express.Router();


Router.get("/", function(req,res){
  console.log("test");
  res.send({"reply":"working"})

});

module.exports = Router;