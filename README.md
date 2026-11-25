# dsh-sensenova-image

A DeepSeek Harness plugin that exposes **SenseNova U1.6 Lite** as image generation and editing tools, with a settings page for the default request parameters and a **SenseNova 6.8 Flash** visual check after generation.

Models:

- `sensenova-u1.6-lite` — image generation
- `sensenova-6.8-flash` — visual check of each generated image (same API key)

## Features

- Generate images from Chinese or English prompts through `/v1/images/generations` with `sensenova-u1.6-lite`.
- Edit 1-5 reference images through `/v1/images/edits`; each reference may be a public URL or a Base64 data URL.
- Download the result and save it in the session working directory; return an absolute path, byte size, temporary URL, and ready-to-use Markdown.
- Check each image against the prompt with `sensenova-6.8-flash` and return `pass` / `warn` / `fail` plus issues; a failed check does not discard the image.
- Choose size/resolution (default `auto`), image count, watermark, prompt polish/expand, text-and-quality enhancement (`self_correction`), visual check, output format, and save directory on **Settings → SenseNova 文生图（U1.6 Lite）**, with a note for each option.
- Explicit tool-call parameters override the saved defaults.
- Works for the root agent and subagents / agent teams.

## Install from a plugin index

1. Open **Plugins** in the DSH Web GUI.
2. Enable **Custom plugin indexes** under **Experimental plugins**.
3. Open **Discover → Add index source** and enter the index URL:
   `https://cdn.jsdelivr.net/gh/xdlg93/dsh-sensenova-image@main/site/index.json`

   Mirrors: `https://raw.githubusercontent.com/xdlg93/dsh-sensenova-image/main/site/index.json` and `https://xdlg93.github.io/dsh-sensenova-image/index.json`. The CDN and raw mirrors can lag briefly; the GitHub Pages mirror can lag while its deployments are retried.
4. Search for `sensenova` and install version `0.4.0` (or an older version from the Versions list).

The API key is read from the `SENSENOVA_API_KEY` credential reference by default. You can also save a custom key on **Settings → SenseNova 文生图（U1.6 Lite）**: it is stored in the DSH credential store and takes precedence; clear it to fall back to `SENSENOVA_API_KEY`. The same key is used for `sensenova-u1.6-lite` and the `sensenova-6.8-flash` visual check.

## Install manually from Git

```sh
dsh plugin --profile web add 'git+https://github.com/xdlg93/dsh-sensenova-image.git#v0.4.0'
```

For a monorepo the plugin manager uses the package directory; this repository keeps the package at the root.

## Usage

```text
sensenova_generate_image(
  prompt="一座漂浮在云海上的未来图书馆，清晨金色阳光，电影感广角",
  size="auto",
  n=1,
  watermark=false,
  prompt_extend=true,
  self_correction=true,
  verify=true,
  output_format="png"
)

sensenova_edit_image(
  prompt="将背景替换为雪山，保持主体不变",
  images=["https://example.com/source.png"],
  size="auto",
  self_correction=true,
  verify=true
)
```

Only `prompt` is required. Omitted parameters use the settings page defaults, then the schema defaults.

## Settings page

Open **Settings → SenseNova 文生图（U1.6 Lite）**:

| Option | Values | Note |
| --- | --- | --- |
| API key | Text (password input) | Uses `SENSENOVA_API_KEY` by default; a saved custom key takes precedence and is stored in the DSH credential store, not in the plugin configuration |
| Size / resolution | auto (default), 2048×2048 (1:1, 2K), 2720×1536 (16:9, 2K), 1536×2720 (9:16, 2K), 1664×2496 (2:3, 2K), 2496×1664 (3:2, 2K), 4096×4096 (1:1, 4K), custom | The API has no separate `resolution` parameter; `size` is the output resolution. `auto` follows the main image for edits; width and height must be 512–4096, multiples of 32, at most 3:1 apart |
| Images per call | 1–4 | More images take longer and consume more quota |
| Watermark | On / Off | Off produces a clean original during the free public beta |
| Prompt polish/expand (`prompt_extend`) | On / Off | The provider polishes/expands the prompt and falls back to the original prompt if expansion fails |
| Text and quality enhancement (`self_correction`) | On / Off | Improves text accuracy and overall image quality |
| Visual check | On / Off | Checks each image with `sensenova-6.8-flash`; a failed check does not discard the image |
| Output format | PNG / JPEG / WebP | PNG is lossless and larger; JPEG/WebP are smaller |
| Save directory | Text | Relative to the session working directory; defaults to `generated-images` |

Saved values are volatile configuration: they apply to the next tool call without a restart.

Defaults: `n` stays 1-4 even though the docs currently support only `n=1`; `watermark` defaults to `false`; `response_format` is internal `url` (not exposed in the UI).

## Versions

- `0.4.0` — add `sensenova_edit_image` with 1-5 reference images; `size: auto`; `self_correction`; prompt polish/expand.
- `0.3.0` — switch to `sensenova-u1.6-lite`; add `sensenova-6.8-flash` visual checks.
- `0.2.3` — fix `link:` installs by declaring the Host peer dependencies.
- `0.2.2` — optional custom SenseNova API key in the settings page.
- `0.2.1` — 2K/4K size presets, default 2048×2048, custom sizes.
- `0.2.0` — Fast model + settings page.
- `0.1.0` — initial Lite-only tool.

All seven are preserved as Git tags (`v0.1.0` … `v0.4.0`) and in the plugin market index. Each declares DSH compatibility `^0.2.2-rc.5 || ^0.2.3-alpha.2`.

## Local directory (`link:`) installs

Version `0.2.3` and later declare `@deepseek-ai/dsh-tools` and `@deepseek-ai/schemastery` in `peerDependencies`. DSH's profile resolver only maps those packages for a linked importer when the importer declares them, so older releases may show `fiberPhase: null` when installed with `link:`. Use `0.2.3` or later for local-directory installs; npm and Git installs are unaffected.

## Development

The Host half is `index.js`; the browser half is `client.js` and registers a `settings.section`. The bundle patch is `cordis.patch.yml`.

```sh
node --check index.js
node --check client.js
```

`engines.dsh` is `^0.2.2-rc.5 || ^0.2.3-alpha.2`.

## License

MIT. See [LICENSE](LICENSE).
