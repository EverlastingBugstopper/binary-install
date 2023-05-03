# 🦀 `binary-install`

Install .tar.gz binary applications via npm

## Installation

`binary-install` is meant to be a `devDependency` of the npm package for the binary you would like to distribute.

After creating your `package.json` with `npm init` or some other method, you should run the following:

```sh
npm i --save-dev binary-install
```

## Usage

If you want, you can check out the [example package](./packages/binary-install-example/) to get a feel for things before reading the following, up to you.

### Intro Concepts

`binary-install` provides a `Binary` class that allows you to download a [tarball](https://www.techtarget.com/whatis/definition/tarball-tar-archive) containing a [binary](https://www.thefreedictionary.com/binary+program) and extract it to the standard location for node binaries.

You could create an `install.js` file that looks something like this:

```node
#!/usr/bin/env node

const { Binary } = require("binary-install");
let binary = new Binary('my-binary', 'https://example.com/binary/tar.gz')
binary.install();
```

_(note: the [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) at the top of the file lets your shell know that this script should be run with the node runtime.)_

And then in your `package.json`, you would add the following:

```json
{
  ...
  "scripts": {
    "postinstall": "node ./install.js"
  }
  ...
}
```

Then, things like this would just work in your local directory!

```sh
npm i && npx my-binary --version
1.0.0
```

You need one more thing before your package is ready to distribute. Make a `run.js` file that looks like this:

```node
#!/usr/bin/env node

const { Binary } = require("binary-install");
let binary = new Binary('my-binary', 'https://example.com/binary/tar.gz')
binary.run();
```

And then in your `package.json`, add the following:

```json
{
  ...
  "bin": {
    "my-binary": "run.js"
  }
  ...
}
```

### Real-world usage

Unfortunately, it's never quite as simple as the above example. You likely want to be able to make changes to your binary and release new versions. You also likely want to distribute on multiple platforms. This means that you'll probably need something that dynamically builds your tarball endpoint with that information. A pretty straightforward example of how you can achieve this can be found [here](./packages/binary-install-example/). You probably want to just clone this repo and take that package as your starting point, just renaming everything along the way, it should get you pretty far.

### Advanced Usage

Any arguments you pass to the `install()` method will be [used to configure Axios](https://axios-http.com/docs/api_intro) when downloading the binary. This is useful for downloading from a private repo when you have to set an `Authorization` header or if you need to do weird things like issue a `POST` instead of a `GET` to retrieve your binary from some endpoint.

#### Overriding the base install directory

You may want to override the base installation directory. To do so, you can pass a third parameter to the `Binary` constructor to specify `installDirectory`, like so:

```javascript
  return new Binary("my-binary", "https://example.com/my-binary/macos-arm/v1.0.0.tar.gz", {
    installDirectory: join(__dirname, ".my-custom-binary-location")
  });
```

### Distribution

Now that you have cross-platform downloads working, it's time to distribute your tool! You should [publish your package](https://docs.npmjs.com/cli/v8/commands/npm-publish) to npm just like normal, and then you should document how to install your tool for your end users. There are generally two approaches you can take to do this.

#### Local Installs _(recommended)_

After you publish your package to npm, others can run `npx my-binary` to install and run you binary, or you can recomment that they install your binary as a `devDependency` by running `npm i --save-dev my-binary`.

#### Global Installs _(not recommended)_

You can also recommend that they run `npm i -g my-binary` if your binary is not project-specific and is only used by indivdual end users and it is not likely to need to be part of a given project (this is very rare for JavaScript tools). This last approach is a bit more fraught than local installs. This is because folks will likely run into the notorious [`EACCES` permissions error](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) that plagues npm global installs. These errors only occur if your end users do not use a node version manager like [volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm), but I've found that most people do not use these and instead install node from their website (which is a totally reasonable thing to do). If you do want people to install your tool globally, and you recommend that they do so, you should prepare to [field](https://github.com/cloudflare/wrangler/issues/1925) a [whole](https://github.com/cloudflare/wrangler/issues/743) [bunch](https://github.com/cloudflare/wrangler/issues/1517) of [issues](https://github.com/cloudflare/wrangler/issues/240) and have a [very](https://github.com/cloudflare/wrangler/issues/803) [bad](https://github.com/cloudflare/wrangler/issues/529) [time](https://github.com/cloudflare/wrangler/issues/1174) 🙃. And the not so great news is that unless Node fundamentally changes their distribution strategy, there's nothing you can do other than tell people to install a version manager!

## History

I originally created this package after refactoring a bit of code that [@xtuc](https://github.com/xtuc) worked on to distribute the first versions of [Wrangler](https://github.com/cloudflare/wrangler) on npm. I now work on [Rover](https://github.com/apollographql/rover) at [Apollo](https://github.com/apollographql) and we also needed to distribute binaries on npm. I knew that the first version of `binary-install` that Wrangler was using caused a [whole slate of issues](https://github.com/cloudflare/wrangler/issues?q=is%3Aissue+install) for the project. I didn't want to repeat the same mistakes at Apollo. I also knew that Cloudflare's maintenance bandwidth was super low at the time because they were shipping cool stuff like [Cloudflare Pages](https://pages.cloudflare.com/) and [Durable Objects](https://developers.cloudflare.com/workers/learning/using-durable-objects/). Since I still had publishing rights to the official npm package, I forked the project to fix up a few of its problems, and the histories of the two repositories have drifted quite a bit. Cloudflare has made a few changes to their repository, and that package is published to [`@cloudflare/binary-install`](https://npmjs.com/package/@cloudflare/binary-install), but I retain control over the nominal [binary-install](https://npmjs.com/package/binary-install) package. And now you know!
