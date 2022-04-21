# `binary-install-example`

This package is not published to npm and is only used for illustrative purposes and for testing `binary-install`.

## `binary.js`

This file contains logic to detect the correct tarball endpoint for [`example-binary`](../example-binary) based on platform (Linux, MacOS, or Windows).

## `install.js`

This file imports the `install` function from `binary.js` and just runs it. `install.js` is referred to by the `postinstall` section in `package.json`.

## `run.test.js`

This file contains just a few tests that make sure that installs work and running commands work.
