const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

const projectRoot = path.dirname(require.resolve("./package.json"));
const projectName = require("./package.json").name;
const bin = path.join(
  projectRoot,
  "node_modules",
  ".bin",
  projectName
);

test("it's installed", () => {
  expect(fs.existsSync(bin)).toBe(true);
});

test("it can print to stdout and count to 4", () => {
  expect(shell.exec(`${bin} -cccc`).stdout).toContain("4");
});