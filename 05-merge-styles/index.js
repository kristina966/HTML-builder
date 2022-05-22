const path = require("path");
const fsPromises = require("fs/promises");

const pathFile = path.join(__dirname, "project-dist", "bundle.css");
const pathFolder = path.join(__dirname, "styles");
let arrOfStyles = [];
(async () => {
  const filesNameArr = await fsPromises.readdir(pathFolder, {
    withFileTypes: true,
  });
  for (let item of filesNameArr) {
    const pathToCurrentFile = path.join(pathFolder, item.name);
    const fileType = path.extname(pathToCurrentFile);
    if (fileType === ".css") {
      const cssContent = await fsPromises.readFile(pathToCurrentFile, "utf8");
      arrOfStyles.push(`${cssContent}\n`);
    }
  }
  await fsPromises.writeFile(pathFile, arrOfStyles);
})();
