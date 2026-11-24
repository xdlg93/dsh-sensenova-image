# dsh-sensenova-image

A DeepSeek Harness plugin that exposes **SenseNova U1.5** image models as the `sensenova_generate_image` tool, with a settings page for the default request parameters.

Supported models:

- `sensenova-u1.5-lite` — quality-focused, default
- `sensenova-u1.5-fast` — lower latency

## Features

- Generate images from Chinese or English prompts through the OpenAI-compatible `/v1/images/generations` endpoint.
- Download the result and save it in the session working directory; return an absolute path, byte size, temporary URL, and ready-to-use Markdown.
- Choose model, size/resolution, image count, watermark, prompt auto-extend, output format, and save directory on **Settings → SenseNova 文生图**, with a note for each option.
- Explicit tool-call parameters override the saved defaults.
- Works for the root agent and subagents / agent teams.

## Install from a plugin index

1. Open **Plugins** in the DSH Web GUI.
2. Enable **Custom plugin indexes** under **Experimental plugins**.
3. Open **Discover → Add index source** and enter the index URL:
   `https://xdlg93.github.io/dsh-sensenova-image/index.json`
4. Search for `sensenova` and install version `0.2.1` (or `0.1.0` / `0.2.0` from the Versions list).

The API key is read from the `SENSENOVA_API_KEY` credential reference by default. You can also save a custom key on **Settings → SenseNova 文生图**: it is stored in the DSH credential store and takes precedence; clear it to fall back to `SENSENOVA_API_KEY`.

## Install manually from Git

```sh
dsh plugin --profile web add 'git+https://github.com/xdlg93/dsh-sensenova-image.git#v0.2.1'
```

For a monorepo the plugin manager uses the package directory; this repository keeps the package at the root.

## Usage

```text
sensenova_generate_image(
  prompt="一座漂浮在云海上的未来图书馆，清晨金色阳光，电影感广角",
  model="sensenova-u1.5-fast",
  size="1024x1024",
  n=1,
  watermark=false,
  prompt_extend=true,
  output_format="png"
)
```

Only `prompt` is required. Omitted parameters use the settings page defaults, then the schema defaults.

## Settings page

Open **Settings → SenseNova 文生图**:

| Option | Values | Note |
| --- | --- | --- |
| API key | Text (password input) | Uses `SENSENOVA_API_KEY` by default; a saved custom key takes precedence and is stored in the DSH credential store, not in the plugin configuration |
| Model | Lite / Fast | Lite favors quality; Fast has lower latency |
| Size / resolution | 2048×2048 (1:1, 2K, default), 2720×1536 (16:9, 2K), 1536×2720 (9:16, 2K), 1664×2496 (2:3, 2K), 2496×1664 (3:2, 2K), 4096×4096 (1:1, 4K), custom | The API has no separate `resolution` parameter; `size` is the output resolution. Width and height must be 512–4096, multiples of 32, at most 3:1 apart |
| Images per call | 1–4 | More images take longer and consume more quota |
| Watermark | On / Off | Off produces a clean original during the free public beta |
| Prompt auto-extend | On / Off | On lets the provider expand the prompt |
| Output format | PNG / JPEG / WebP | PNG is lossless and larger; JPEG/WebP are smaller |
| Save directory | Text | Relative to the session working directory; defaults to `generated-images` |

Saved values are volatile configuration: they apply to the next tool call without a restart.

## Versions

- `0.2.1` — 2K/4K size presets, default 2048×2048, custom sizes.
- `0.2.0` — Fast model + settings page.
- `0.1.0` — initial Lite-only tool.

All three are preserved as Git tags (`v0.1.0`, `v0.2.0`, `v0.2.1`) and in the plugin market index. Each declares DSH compatibility `^0.2.2-rc.5 || ^0.2.3-alpha.2`.

## Development

The Host half is `index.js`; the browser half is `client.js` and registers a `settings.section`. The bundle patch is `cordis.patch.yml`.

```sh
node --check index.js
node --check client.js
```

`engines.dsh` is `^0.2.2-rc.5 || ^0.2.3-alpha.2`.

## License

MIT. See [LICENSE](LICENSE).
