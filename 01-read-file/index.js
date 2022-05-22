let fs = require("fs");
const path = require("path");
let endPath = path.join(__dirname, "text.txt");

let text;
let readStream = new fs.ReadStream(endPath);
readStream.on("readable", function () {
  let text = readStream.read();
  if (text) {
    console.log(text.toString());
  }
});
