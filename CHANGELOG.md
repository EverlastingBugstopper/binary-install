# `binary-install` changelog

## v1.1.0

### Features

- Adds an optional third argument to `new Binary` to configure the installation directory - @wighawag, PR #29

  Example: `new Binary("my-binary", "https://example.com/my-binary.tar.gz", { "installDirectory": "/tmp/custom-dir" })`

### Maintenance

- Updates `binary-install-example` to download Intel binaries by default for Apple Silicon machines - @maxdeviant, PR #24

- Fix log suppression configuration - @maxdeviant, PR #23

  This PR makes the `suppressLogs` behavior actually respected, before it was inverted and would log messages incorrectly.

- Wait for a complete install before running a binary - @wighawag, PR #28 fixes #27

  Sometimes installation wouldn't complete before the binary was run, this PR rewrites the code to fully complete installation before continuing to execution.

- Fix up integration tests - @EverlastingBugstopper, PR #31

  This relied on overriding `installDirectory` with the new feature in this release, thanks @wighawag!

## [<= v1.0.6]

There are no changelog entries pre-v1.1.0.
