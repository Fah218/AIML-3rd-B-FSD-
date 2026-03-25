const http = require("http");
const fs = require("fs");
const fetchData = require("./fetchData");
const { writeData } = require("./usefsmodule");

const PORT = 4008;

const server = http.createServer(async (req, res) => {

    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    console.log(`Incoming: ${req.method} ${req.url}`);

    // Route 1: Welcome Message
    if (req.url === "/msg" && req.method === "GET") {
        res.setHeader("Content-Type", "text/html");
        res.end("<h2>Welcome message from Node Server</h2>");
    }

    // Route 2: Fetch API Data
    else if (req.url === "/data" && req.method === "GET") {
        res.setHeader("Content-Type", "application/json");
        const apiData = await fetchData();
        res.end(JSON.stringify(apiData));
    }

    // Route 3: Write Data using FS module
    else if (req.url === "/writeData" && req.method === "GET") {
        res.setHeader("Content-Type", "application/json");
        const result = writeData();
        res.end(JSON.stringify({ msg: result }));
    }

    // Route 4: Register User and Save to student.json
    else if (req.url === "/register" && req.method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const newStudent = JSON.parse(body);

            let students = [];

            // read existing data
            if (fs.existsSync("student.json")) {
                try {
                    const data = fs.readFileSync("student.json", "utf8");
                    if (data) {
                        students = JSON.parse(data);
                    }
                } catch (err) {
                    console.error("Error parsing student.json:", err);
                }
            }

            // add new user
            students.push(newStudent);

            // save to file
            fs.writeFileSync("student.json", JSON.stringify(students, null, 2));

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Registration successful" }));
        });
    }

    // 404 Route
    else {
        res.statusCode = 404;
        res.end("Route not found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});