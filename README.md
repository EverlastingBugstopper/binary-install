# 🦀 `binary-install` monorepo

This repository contains two JavaScript packages orchestrated by Lerna, located in `./packages`, and an example Rust binary in `./example-binary`.

## Project structure

### `./packages/binary-install`

This package is published to npm as [`binary-install`](https://npmjs.com/package/binary-install) and provides convenience functions for distributing binaries via npm.

### `./packages/binary-install-example`

This package is used to test `binary-install` and to show an example of a project that uses `binary-install`. It is configured to download pre-built binaries from the GitHub releases hosted in this repository.

### `./example-binary`

This is a Rust package that simply takes some `-c` arguments, counts how many you passed, and prints the result to `stdout`. New versions can be automatically published to GitHub releases with the GitHub Actions workflows in this repository.

## Maintenance

This project is maintained by me when I have time. This project has been built for my needs and my needs only, and I do not provide any guarantees on response time to issues or PRs. Not saying I won't accept contributions, they just may take a bit of time to see the light of day.

## CI

This repository contains a few [GitHub Actions workflows](./.github/workflows) that help to automate code quality in this repository.

### Lints

We use [prettier](https://prettier.io/) to format the JS in this package. CI will run `npm run fmt:check` to make sure everything is in line. Before pushing up changes on a branch, you should make sure to run `npm run fmt` from the root of the repository to make sure that this check does not fail.

### Tests

We use [jest](https://jestjs.io/) to run a few tests in `binary-install`. You can run `npm test` from the root of the repository to run these tests locally.

We use [cargo](https://doc.rust-lang.org/cargo/) to run a few tests in `example-binary`. You can run the tests with `cargo test` in the `example-binary` directory.

### Release

We currently publish `binary-install` manually from the command line, but `example-binary` packages are published with the `release_rust` GitHub Actions workflow. Running `git tag -a 'rust_v1.0.0' -m 'rust_v1.0.0' && git push --tags` will kick this workflow off.
