import typeFlag from "type-flag";
import { ZipFile } from "libzip";
import * as path from "path";
import * as fs from "fs";
import * as rimraf from "rimraf";

const {
  flags: { key, mode },
  unknownFlags,
} = typeFlag({
  key: String,
  mode: String,
});

if (!key) {
  throw new Error("Task key is not provided");
}

const [secret, taskNumber] = key.split(".");

if (!taskNumber) {
  throw new Error("Task number can not be parsed");
}

const sourceFolder = "./src";
const taskFile = `./tasks/${taskNumber}.zip`;

if (mode === "write") {
  const input = path.resolve(__dirname, sourceFolder);
  ZipFile.CreateFromDirectory(input, taskFile, secret);
  rimraf.sync(sourceFolder);
} else {
  const output = path.resolve(__dirname, sourceFolder);
  rimraf.sync(sourceFolder);
  ZipFile.ExtractToDirectory(taskFile, output, secret);
  console.log(
    `Task ${taskNumber} was decrypted. Find next instructions ${output}/README.md`
  );
}
