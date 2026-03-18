const fs = require("fs");
const fsPromises = require("fs").promises;

// WRITE FILE
function writeData() {
    try {
        fs.writeFileSync("student.txt", "Welcome to FS Module");
        return "Data written successfully!";
    } catch (err) {
        return "Error: " + err.message;
    }
}

// READ FILE (Sync)
function readData() {
    try {
        return fs.readFileSync("student.txt", "utf-8");
    } catch (err) {
        return "Error: " + err.message;
    }
}

// DELETE FILE
function deleteData() {
    try {
        fs.unlinkSync("student.txt");
        return "File deleted successfully!";
    } catch (err) {
        return "Error: " + err.message;
    }
}

// COPY FILE
function dataCopy() {
    try {
        fs.copyFileSync("studentCSE.json", "studentCSEAIML.json");
        return "File copied successfully!";
    } catch (err) {
        return "Error: " + err.message;
    }
}

// READ FILE (Async)
async function fileReadAsync() {
    try {
        return await fsPromises.readFile("student.txt", "utf-8");
    } catch (err) {
        return "Error: " + err.message;
    }
}

module.exports = {
    writeData,
    readData,
    deleteData,
    dataCopy,
    fileReadAsync
};