const http = require("http");
const fetchData = require('./fetchData');

const PORT = 4007;

const server = http.createServer(async (req, res) => {

    // ✅ CORS FIX
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/msg' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        res.end("<h2>Welcome message from Node Server</h2>");
    }

    else if (req.url === '/data' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        const apiData = await fetchData();
        res.end(JSON.stringify(apiData));
    }

    else if (req.url === '/data' && req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ msg: "Post method for data insertion" }));
    }

    else {
        res.statusCode = 404;
        res.end("Route not found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});