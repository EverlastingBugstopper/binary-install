const fs = require("fs");
const shell = require("shelljs");

test("binary exists", () => {
  expect(fs.existsSync(global.fixture.binaryPath)).toBe(true);
});

test("direct bin can print to stdout and count to 4", () => {
  expect(shell.exec(`${global.fixture.binaryPath} -cccc`).stdout).toContain(
    "4"
  );
});

test("npx can print to stdout and count to 9", () => {
  expect(
    shell.exec(
      `npx ${global.PROJECT_NAME} -ccccccccc`,
      global.fixture.shellOpts
    ).stdout
  ).toContain("9");
});

test("can receive piped input", () => {
  expect(
    shell
      .echo("hello world")
      .exec(`npx ${global.PROJECT_NAME} echo`, global.fixture.shellOpts).stdout
  ).toContain("hello world");
});
