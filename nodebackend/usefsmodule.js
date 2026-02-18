const fs = require('fs')
const fs1 = require('fs').promises

function writeData() {
    let statusmsg="";
    try {
        fs.writeFileSync("student.txt", "Welcome to FS Module")
        console.log("Data is written successfully!!")
        statusmsg="Data is written successfully!!";
    } catch (e) {
        console.log("Error is" + e)
        statusmsg="Error is" + e;
    }
    return statusmsg;
}
module.exports=writeData;