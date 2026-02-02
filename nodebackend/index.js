const http = require("http");
const PORT = 4007;
const server = http.createServer((req, res)=>{


//     res.setHeader('Content-type','text/html');
// res.end("<h2>Hello, welcome to node server</h2>")


if(req.url=='/msg' && req.method=='GET'){
    res.setHeader('Content-Type','text/html');
    res.end("<h2 >Welcome message from node Server </h2>")
}


if(req.url=='/data' && res.method=='GET'){
    res.setHeader('Content-Type','application/json')
    res.end(JSON.stringify({msg:"This is json data"}));
}

if(req.url=='/data' && req.method== "POST"){
    res.setHeader('Content-Type','application/json')
    res.end(JSON.stringify({msg:"Post method for data insertion"}));
}

});

server.listen(PORT, ()=>{
    console.log(`Service is available at ${PORT}`)
})