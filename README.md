# dsh-sensenova-image

A DeepSeek Harness plugin that exposes **SenseNova U1.5 Lite** (`sensenova-u1.5-lite`) as the `sensenova_generate_image` tool.

## Features

- Generate images from Chinese or English prompts through the OpenAI-compatible `/v1/images/generations` endpoint.
- Download the result and save it in the session working directory; return an absolute path, byte size, temporary URL, and ready-to-use Markdown.
- Works for the root agent and subagents / agent teams.

## Install

From the plugin index:

1. Open **Plugins** and enable **Custom plugin indexes** under **Experimental plugins**.
2. Open **Discover → Add index source** and enter:
   `https://xdlg93.github.io/dsh-sensenova-image/index.json`
3. Search for `sensenova` and install `0.1.0` from the Versions list.

Manually from Git:

```sh
dsh plugin --profile web add 'git+https://github.com/xdlg93/dsh-sensenova-image.git#v0.1.0'
```

The API key is read from the `SENSENOVA_API_KEY` credential reference. Store it on the DSH Models page or export it before launching DSH.

## Usage

```text
sensenova_generate_image(
  prompt="一只橘猫坐在窗台上，柔和晨光，写实摄影风格",
  size="1024x1024"
)
```

Only `prompt` is required. `size`, `n`, `watermark`, `prompt_extend`, and `output_format` have defaults.

## Versions

- `0.1.0` — initial Lite-only tool.
- `0.2.0` — adds Fast model and a settings page.

## License

MIT. See [LICENSE](LICENSE).
