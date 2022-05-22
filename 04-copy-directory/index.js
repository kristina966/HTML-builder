const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const pathFromCopy = path.join(__dirname, "files");
const pathToCopy = path.join(__dirname, "files-copy");

fs.access(pathToCopy, (error) => {
  if (error) {
    fsPromises.mkdir(pathToCopy);
  } else {
  }
});
async function copyDir(fromPath, toPath) {
  await fsPromises.rm(toPath, { force: true, recursive: true });
  await fsPromises.mkdir(toPath, { recursive: true });
  const filesNameArr = await fsPromises.readdir(fromPath, {
    withFileTypes: true,
  });
  for (let item of filesNameArr) {
    const currentItemPath = path.join(fromPath, item.name);
    const copyItemPath = path.join(toPath, item.name);

    if (item.isDirectory()) {
      await fsPromises.mkdir(copyItemPath, { recursive: true });
      await copyDir(currentItemPath, copyItemPath);
    } else if (item.isFile()) {
      await fsPromises.copyFile(currentItemPath, copyItemPath);
    }
  }
}
copyDir(pathFromCopy, pathToCopy);
