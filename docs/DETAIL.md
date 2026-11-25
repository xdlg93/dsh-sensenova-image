# SenseNova 文生图（U1.6 Lite）

本插件把商汤日日新 **SenseNova U1.6 Lite** 图片模型接入 DeepSeek Harness，并用 **SenseNova 6.8 Flash** 做生成后的视觉核对：

- `sensenova_generate_image`：根据文本提示生成图片，下载并保存到会话工作目录，返回绝对路径、字节数和可直接展示的 Markdown。
- `sensenova_edit_image`：输入 1–5 张参考图和编辑指令，完成图生图 / 图片改写；第一张为主图。
- 图片模型固定为 `sensenova-u1.6-lite`；视觉核对模型为 `sensenova-6.8-flash`。
- 两个模型共用同一套 API Key 和 base URL：默认使用 `SENSENOVA_API_KEY`；设置页保存自定义 Key 后，两个模型都优先使用它。

## 为什么不是聊天模型

U1.6 Lite 是图片创作模型，服务端只提供 OpenAI 兼容的图像接口：

- 文生图：`POST https://token.sensenova.cn/v1/images/generations`
- 参考图编辑：`POST https://token.sensenova.cn/v1/images/edits`

它没有可用的 `/chat/completions` 路由，因此不能像普通对话模型一样挂在 `llm-pi-ai` 的 `models` 列表里。本插件按官方建议，通过自定义 Tool 的方式接入。

视觉核对使用的是另一个模型 `sensenova-6.8-flash`，它支持图片输入，走 `POST /v1/chat/completions`。核对请求把指令和图片放在同一条 user 消息里（该网关不接受带图片的 system 角色），并使用与图片生成相同的 API Key。

> 官方文档已把文生图模型更新为 `sensenova-u1.6-lite` 与 `sensenova-u1-pro`。平台的 `GET /v1/models` 可能短暂滞后；以官方文档和实际调用为准。

## 设置页（推荐）

在 Web GUI 的 **设置 → SenseNova 文生图（U1.6 Lite）** 中可以直接选择默认参数，保存后下一次工具调用生效：

| 选项 | 可选值 | 说明 |
| --- | --- | --- |
| API Key | 文本（密码输入） | 默认使用当前配置的 `SENSENOVA_API_KEY`；填写并保存后优先使用你的 Key。Key 保存在 DSH 凭据库，不写入插件配置；可随时清除恢复默认。图片生成和视觉核对共用这个 Key。 |
| 尺寸 / 分辨率 | auto（默认）、2048×2048（1:1，2K）、2720×1536（16:9，2K）、1536×2720（9:16，2K）、1664×2496（2:3，2K）、2496×1664（3:2，2K）、4096×4096（1:1，4K）、自定义 | 本接口没有单独的 `resolution` 参数，`size` 就是输出分辨率；`auto` 自动适配（编辑时跟随主图）；宽高需为 512–4096、32 的倍数、比例不超过 3:1。 |
| 生成张数 | 1–4 | 张数越多，耗时和配额消耗越高。 |
| 水印 | 开 / 关 | 开启后图片带平台水印；公测期关闭可生成无水印原图。 |
| 提示词自动润色/扩写（prompt_extend） | 开 / 关 | 服务端自动润色/扩写提示词；扩写失败时自动使用原始 prompt。与原来的“自动扩写”是同一个参数。 |
| 文字与画质增强（self_correction） | 开 / 关 | 提升图中文字的准确性和整体画质；默认开启。 |
| 视觉核对 | 开 / 关 | 生成后用 `sensenova-6.8-flash` 检查每张图是否满足提示词；核对失败不会丢弃图片。 |
| 输出格式 | PNG / JPEG / WebP | PNG 无损、体积较大；JPEG / WebP 体积更小，适合网页和分享。 |
| 保存目录 | 文本 | 相对会话工作目录；默认 `generated-images`。 |

**优先级**：工具调用显式参数 > 设置页默认值 > 插件 schema 默认值。设置页写入的是 volatile 字段，修改后不需要重启，下一次工具调用读取新值。API Key 的优先级单独为：设置页自定义 Key > 配置的 `SENSENOVA_API_KEY`。

## 工具参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `prompt` | 是 | 图像描述，中英文均可。 |
| `size` | 否 | `auto`、`2K`、`4K` 或 `宽x高`；宽高 512–4096、32 的倍数、比例不超过 3:1。省略时用设置页默认值（默认 `auto`）。 |
| `n` | 否 | 生成张数，1–4。注意：官方文档目前仅支持 `n=1`。省略时用设置页默认值（默认 1）。 |
| `watermark` | 否 | 是否加水印。省略时用设置页默认值（默认 `false`，公测期无水印）。 |
| `prompt_extend` | 否 | 是否让服务端自动润色/扩写提示词；扩写失败时自动使用原始 prompt。省略时用设置页默认值（默认 `true`）。 |
| `self_correction` | 否 | 是否提升图中文字准确性和整体画质。省略时用设置页默认值（默认 `true`）。 |
| `verify` | 否 | 是否用 `sensenova-6.8-flash` 做视觉核对。省略时用设置页默认值（默认 `true`）。 |
| `output_format` | 否 | `png`、`jpeg` 或 `webp`。省略时用设置页默认值（默认 `png`）。 |
| `filename` | 否 | 保存文件的基础名；扩展名和唯一后缀会自动追加。 |

## 图片编辑工具参数

`sensenova_edit_image` 使用 `POST /v1/images/edits`：

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `prompt` | 是 | 编辑指令，描述期望的最终画面。 |
| `images` | 是 | 1–5 张参考图；每项是公网 HTTPS URL 或 Base64 Data URL（`data:image/png;base64,...`）。第一张为主图。 |
| `size` | 否 | `auto`（默认，跟随主图）、`2K`、`4K` 或 `宽x高`。 |
| `watermark` | 否 | 是否加水印。省略时用设置页默认值。 |
| `prompt_extend` | 否 | 是否自动润色/扩写编辑指令。省略时用设置页默认值。 |
| `self_correction` | 否 | 是否提升文字准确性和整体画质。省略时用设置页默认值。 |
| `verify` | 否 | 是否用 `sensenova-6.8-flash` 做视觉核对。省略时用设置页默认值。 |
| `output_format` | 否 | `png`、`jpeg` 或 `webp`。 |
| `filename` | 否 | 保存文件的基础名。 |

## 结果

工具返回 `model`、`prompt`、`size` 和 `images[]`；每张图包含：

- `path`：本地绝对路径；
- `bytes`：文件字节数；
- `markdown`：`![SenseNova image](<path>)`，可直接放进回复；
- `url`：服务端临时链接（24 小时有效，可能不存在）；
- `verification`：视觉核对结果（`verify` 开启时），包含：
  - `model`：`sensenova-6.8-flash`；
  - `status`：`pass` / `warn` / `fail` / `error`；
  - `summary`：一句话结论；
  - `issues`：发现的问题列表。

图片默认保存在会话工作目录的 `generated-images/` 下；可通过插件配置 `outputDir` 改为其他目录（相对路径按会话工作目录解析，也可用绝对路径）。

## 配置

```yaml
- id: sensenova-image
  name: dsh-sensenova-image
  config:
    apiKeyEnv: SENSENOVA_API_KEY
    baseURL: https://token.sensenova.cn/v1
    model: sensenova-u1.6-lite
    size: auto
    n: 1
    watermark: false
    prompt_extend: true
    self_correction: true
    verify: true
    output_format: png
    outputDir: generated-images
    requestTimeoutMs: 300000
```

`apiKeyEnv` 指向 DSH 凭据库中的引用名；默认使用模型页已保存的 `SENSENOVA_API_KEY`。密钥也可以在启动环境中导出，凭据库中的值优先。自定义 Key 会同时用于图片生成和视觉核对。

## 限制

- 生成接口按次计费/消耗配额；公测期有免费额度，以平台控制台为准。
- 视觉核对会额外消耗 `sensenova-6.8-flash` 的 token；关闭“视觉核对”可跳过。
- 返回的临时 URL 24 小时后失效；插件已把图片下载到本地，长期使用请引用 `path`。
- U1.6 Lite 生成/编辑耗时波动较大（512×512 实测约 90 秒，2048×2048 约 50 秒）；4K 或多张会更久。工具超时为 6 分钟，图片请求超时为 5 分钟。
- 官方文档目前 `n` 仅支持 1；插件按用户选择保留 1–4，超过 API 支持时以接口返回为准。
- 官方文档 `watermark` 默认 `true`；插件默认 `false`（公测期无水印）。
- `response_format` 由插件固定使用 `url` 以便下载保存，不暴露为 UI 选项。
