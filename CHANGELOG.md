# Changelog

## 0.4.1

- Fix the visual check returning HTTP 400: fall back from the temporary image URL to a Base64 data URL, then from `sensenova-6.8-flash` to `sensenova-6.8-flash-lite`. If every combination returns 400, skip the check quietly instead of printing an error line; non-400 failures remain visible.
- Serve the plugin market index from `/docs` so GitHub Pages can deploy from the `main` branch; remove the GitHub Actions Pages workflow.

## 0.4.0

- Add `sensenova_edit_image` with 1-5 reference images (public URL or Base64 data URL) through `/v1/images/edits`; the first image is the primary image.
- Add `size: auto` as the default for generation and editing; keep the 2K/4K presets and custom sizes.
- Add the `self_correction` toggle for text accuracy and overall image quality.
- Rename the prompt switch to **prompt polish/expand** (`prompt_extend`); the docs define one parameter for polishing and expansion, so no duplicate switch is added. The provider falls back to the original prompt when expansion fails.
- Keep `n` 1-4 in the plugin even though the docs currently support only `n=1`; keep `watermark` default `false`; keep `response_format` internal as `url`.

## 0.3.0

- Switch the image model to `sensenova-u1.6-lite`; remove `sensenova-u1.5-lite` and `sensenova-u1.5-fast`.
- Add an automatic visual check with `sensenova-6.8-flash` after each image; the same API key and base URL are used for both models, and a failed check does not discard the image.
- Replace the settings-page model selector with a **Visual check** toggle.
- Raise the image request timeout to 5 minutes and the tool timeout to 6 minutes for U1.6 generation.

## 0.2.3

- Fix local directory (`link:`) installs: declare `@deepseek-ai/dsh-tools` and `@deepseek-ai/schemastery` in `peerDependencies`, so the profile resolver maps them for importers outside the profile. npm and Git installs are unaffected.

## 0.2.2

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
