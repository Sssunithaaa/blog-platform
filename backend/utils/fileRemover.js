import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const fileRemover = (filename) => {
  const filePath = path.join(__dirname, "../uploads", filename);

  fs.unlink(filePath, function (err) {
    if (err && err.code === "ENOENT") {
      console.log(`File ${filename} doesn't exist`);
    } else if (err) {
      console.log(`Error occurred while trying to remove the file ${filename}`);
    } else {
      console.log(`File ${filename} removed`);
    }
  });
};
