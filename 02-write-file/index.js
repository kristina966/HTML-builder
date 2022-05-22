const fs = require("fs");
const path = require("path");
const readline = require("readline");

let endPath = path.join(__dirname, "text.txt");
fs.appendFile(endPath, "", () => {});
let readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function textRead() {
  readLine.question("Ввести текст:" + "", function (answer) {
    if (answer === "exit") {
      console.log("Завершить процесс");
      process.exit();
    }
    fs.appendFile(endPath, "\n" + `${answer}`, function () {});
    textRead();
  });
}
readLine.on("SIGINT", function () {
  console.log("Завершить процесс");
  process.exit();
});
textRead();
