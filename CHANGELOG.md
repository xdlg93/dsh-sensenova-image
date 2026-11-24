# Changelog

## Unreleased

- Add an optional custom SenseNova API key to the settings page. A saved key takes precedence over the configured `SENSENOVA_API_KEY`; clearing it restores the default.

## 0.2.1

- Replace the size presets with 2K/4K options: 2048×2048 (1:1), 2720×1536 (16:9), 1536×2720 (9:16), 1664×2496 (2:3), 2496×1664 (3:2), and 4096×4096 (1:1); the default is now 2048×2048. Custom sizes remain available.
- Declare compatibility with DSH `0.2.2-rc.5` and `0.2.3-alpha.2` via `^0.2.2-rc.5 || ^0.2.3-alpha.2`; the 0.1.0 and 0.2.0 releases use the same range.

## 0.2.0

- Add `sensenova-u1.5-fast` alongside `sensenova-u1.5-lite`; choose the model per tool call or in the settings page.
- Add a **Settings → SenseNova 文生图** page with notes for model, size/resolution, image count, watermark, prompt auto-extend, output format, and save directory.
- Make the request defaults volatile configuration; saved settings apply to the next tool call without a restart.
- Keep explicit tool-call parameters ahead of settings defaults.

## 0.1.0

- Initial release: `sensenova-u1.5-lite` text-to-image tool.
- Calls `/v1/images/generations`, downloads the result, and saves it in the session working directory.
- Returns absolute paths, byte sizes, temporary URLs, and ready-to-use Markdown.
