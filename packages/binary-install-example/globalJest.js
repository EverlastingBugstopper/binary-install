const fs = require("fs");
const path = require("path");
const os = require("os");
const shell = require("shelljs");

const PACKAGES_ROOT = path.resolve(path.dirname(require.resolve("./package.json")), "..");
const PROJECT_NAME = require("./package.json").name;

const exec = (command, shellOpts = global.fixture.shellOpts) => {
  let message = `running ${command}`;
  if (shellOpts?.cwd) {
    message = `${message} in ${shellOpts.cwd}`
  }
  shell.echo(`${message}...`);
  const result = shell.exec(command, shellOpts);
  shell.echo(result.stderr);
  shell.echo(result.stdout);
  if (result.code != 0) {
    shell.echo(`${command} exited with code ${result.code}, aborting`);
    process.exit(result.code);
  }
};

const setupFixture = () => {
  const FIXTURE_WORKSPACE = "binary-install-test-fixture";

  global.fixture = {};
  global.fixture.rootFixturePath = fs.mkdtempSync(path.join(os.tmpdir(), `${FIXTURE_WORKSPACE}-`))
  global.fixture.dirPath = path.join(global.fixture.rootFixturePath, PROJECT_NAME);

  shell.echo(`mkdir -p ${global.fixture.dirPath}`);
  exec(`mkdir -p ${global.fixture.dirPath}`);
  expect(fs.existsSync(global.fixture.dirPath)).toBe(true);

  global.fixture.shellOpts = { cwd: global.fixture.dirPath };
  global.fixture.binaryPath = path.join(
    global.fixture.dirPath,
    "node_modules",
    ".bin",
    PROJECT_NAME
  );

  // copy the example package into the fixture
  shell.echo(`cp -r ${PACKAGES_ROOT} ${global.fixture.dirPath}`);
  fs.cpSync(PACKAGES_ROOT, global.fixture.rootFixturePath, {
    recursive: true
  });

  global.fixture.dirPath = path.join(global.fixture.dirPath, PROJECT_NAME);

  // remove the installed binary if it exists
  exec(`rm -f ${global.fixture.binaryPath}`);

  // install binary-install dependencies
  exec("npm install", { "cwd": path.join(PACKAGES_ROOT, "binary-install")});

  // re-install the binary
  exec("npm install", { "cwd": path.join(PACKAGES_ROOT, PROJECT_NAME)});
};

global.exec = exec;
global.PROJECT_NAME = PROJECT_NAME;
setupFixture();
