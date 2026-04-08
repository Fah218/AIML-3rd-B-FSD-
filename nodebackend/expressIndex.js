const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');

const app = express();
const PORT = 4008;

// middlewares
app.use(express.json());
app.use(cors());

// test routes
app.get('/', (req, res) => {
    res.json({ msg: "Hiii...." });
});

app.get('/msg', (req, res) => {
    res.send("<h1>welcome to abes</h1>");
});

// ---------------- REGISTER ----------------
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields required" });
    }

    let students = [];

    try {
        // read existing data (if file exists)
        try {
            const data = await fs.readFile("student.json", "utf8");
            if (data) students = JSON.parse(data);
        } catch (err) {
            // file doesn't exist → ok
        }

        // check duplicate user
        const userExists = students.find(s => s.email === email);
        if (userExists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // add new user
        students.push({ name, email, password });

        await fs.writeFile("student.json", JSON.stringify(students, null, 2));

        res.json({ success: true, message: "User registered successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// ---------------- LOGIN ----------------
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let students = [];

    try {
        const data = await fs.readFile("student.json", "utf8");
        if (data) students = JSON.parse(data);
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error" });
    }

    const foundUser = students.find(
        s => s.email === email && s.password === password
    );

    if (foundUser) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.json({ success: false, message: "Invalid email or password" });
    }
});

// ---------------- OPTIONAL GET (for browser) ----------------
app.get('/register', (req, res) => {
    res.send("Use POST request for /register");
});

app.get('/login', (req, res) => {
    res.send("Use POST request for /login");
});

// ---------------- SERVER ----------------
app.listen(PORT, () => {
    console.log("Express server is running on: " + PORT);
});