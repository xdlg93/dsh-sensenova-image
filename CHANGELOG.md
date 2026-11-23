# Changelog

## 0.2.0

- Add `sensenova-u1.5-fast` alongside `sensenova-u1.5-lite`; choose the model per tool call or in the settings page.
- Add a **Settings → SenseNova 文生图** page with notes for model, size/resolution, image count, watermark, prompt auto-extend, output format, and save directory.
- Make the request defaults volatile configuration; saved settings apply to the next tool call without a restart.
- Keep explicit tool-call parameters ahead of settings defaults.

## 0.1.0

- Initial release: `sensenova-u1.5-lite` text-to-image tool.
- Calls `/v1/images/generations`, downloads the result, and saves it in the session working directory.
- Returns absolute paths, byte sizes, temporary URLs, and ready-to-use Markdown.
