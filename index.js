var connect = require('connect');
var static = require('serve-static');

var PORT = process.env.PORT || 5000;

connect().use(static(__dirname)).listen(PORT, function(){
    console.log("Server running on "+ PORT +"...");
});