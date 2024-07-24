# slim2html

[Slim] to HTML online converter

> [!WARNING]
> By design, Slim template language allows inserting Ruby code inside template.
> Because of this app is not suitable hosting globally as makes possible running arbitrary code.
> Using Docker for running app despite being prefferable doesn't protect it from possible breakage.
> Aside of that running locally for personally use is totally fine.

## Technologies used

- Website
  - [Alpine.js] - lightweight JS framework
  - [Water.css] - small class-less CSS framework
  - [esbuild] - JS/CSS bundler
- Server
  - [Roda] - web framework
  - [Slim] - template language

## Run with Docker

```sh
# start (first run will be longer due to build step)
docker compose up
# to stop press Ctrl+C

# alternatively, start in background
docker compose up -d
# stop background run
docker compose down
```

Open <http://localhost:3001>

## Run locally

```sh
# install dependencies
pnpm install
bundle install
# build
pnpm build
# run
rake
```

Open <http://localhost:3001>

[Alpine.js]: https://alpinejs.dev/
[Water.css]: https://watercss.kognise.dev/
[esbuild]: https://esbuild.github.io/
[Roda]: https://roda.jeremyevans.net/
[Slim]: https://github.com/slim-template/slim
