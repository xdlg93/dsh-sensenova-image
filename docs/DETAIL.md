# SenseNova 文生图（Lite / Fast）

本插件把商汤日日新 **SenseNova U1.5** 图片模型接入 DeepSeek Harness，注册一个模型可调用的工具：

- `sensenova_generate_image`：根据文本提示生成图片，下载并保存到会话工作目录，返回绝对路径、字节数和可直接展示的 Markdown。
- 支持两个模型：`sensenova-u1.5-lite`（质量优先，默认）与 `sensenova-u1.5-fast`（低延迟）。

## 为什么不是聊天模型

U1.5 Lite / Fast 都是图片创作模型，服务端只提供 OpenAI 兼容的图像接口：

- 文生图：`POST https://token.sensenova.cn/v1/images/generations`
- 参考图编辑：`POST https://token.sensenova.cn/v1/images/edits`

它们没有可用的 `/chat/completions` 路由（实测返回 `404 model is not found`），因此不能像普通对话模型一样挂在 `llm-pi-ai` 的 `models` 列表里。本插件按官方建议，通过自定义 Tool 的方式接入。

> 注意：平台的 `GET /v1/models` 当前只列出 `sensenova-u1.5-lite`，没有列出 `sensenova-u1.5-fast`；但直接调用 `/v1/images/generations` 并传 `model: sensenova-u1.5-fast` 实测返回 200 并成功出图。因此本插件按“直接调用可用”接入 Fast。

## 设置页（推荐）

在 Web GUI 的 **设置 → SenseNova 文生图** 中可以直接选择默认参数，保存后下一次工具调用生效：

| 选项 | 可选值 | 说明 |
| --- | --- | --- |
| 模型 | Lite / Fast | Lite 质量优先，适合海报、信息图、成品图；Fast 延迟更低，适合快速预览和批量草稿。 |
| 尺寸 / 分辨率 | 512×512、1024×1024、1024×576、576×1024、1536×1536、2048×2048（2K）、4096×4096（4K）、自定义 | 本接口没有单独的 `resolution` 参数，`size` 就是输出分辨率；宽高需为 512–4096、32 的倍数、比例不超过 3:1。 |
| 生成张数 | 1–4 | 张数越多，耗时和配额消耗越高。 |
| 水印 | 开 / 关 | 开启后图片带平台水印；公测期关闭可生成无水印原图。 |
| 提示词自动扩写 | 开 / 关 | 开启后服务端会扩写提示词，细节更丰富；关闭则严格按原文生成。 |
| 输出格式 | PNG / JPEG / WebP | PNG 无损、体积较大；JPEG / WebP 体积更小，适合网页和分享。 |
| 保存目录 | 文本 | 相对会话工作目录；默认 `generated-images`。 |

**优先级**：工具调用显式参数 > 设置页默认值 > 插件 schema 默认值。设置页写入的是 volatile 字段，修改后不需要重启，下一次工具调用读取新值。

## 工具参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `prompt` | 是 | 图像描述，中英文均可。 |
| `model` | 否 | `sensenova-u1.5-lite`（质量优先）或 `sensenova-u1.5-fast`（低延迟）。省略时用设置页默认值（默认 Lite）。 |
| `size` | 否 | `2K`、`4K` 或 `宽x高`；宽高 512–4096、32 的倍数、比例不超过 3:1。省略时用设置页默认值（默认 `1024x1024`）。 |
| `n` | 否 | 生成张数，1–4。省略时用设置页默认值（默认 1）。 |
| `watermark` | 否 | 是否加水印。省略时用设置页默认值（默认 `false`，公测期无水印）。 |
| `prompt_extend` | 否 | 是否让服务端自动扩写提示词。省略时用设置页默认值（默认 `true`）。 |
| `output_format` | 否 | `png`、`jpeg` 或 `webp`。省略时用设置页默认值（默认 `png`）。 |
| `filename` | 否 | 保存文件的基础名；扩展名和唯一后缀会自动追加。 |

## 结果

工具返回 `model`、`prompt`、`size` 和 `images[]`；每张图包含：

- `path`：本地绝对路径；
- `bytes`：文件字节数；
- `markdown`：`![SenseNova image](<path>)`，可直接放进回复；
- `url`：服务端临时链接（24 小时有效，可能不存在）。

图片默认保存在会话工作目录的 `generated-images/` 下；可通过插件配置 `outputDir` 改为其他目录（相对路径按会话工作目录解析，也可用绝对路径）。

## 配置

```yaml
- id: sensenova-image
  name: dsh-sensenova-image
  config:
    apiKeyEnv: SENSENOVA_API_KEY
    baseURL: https://token.sensenova.cn/v1
    model: sensenova-u1.5-lite
    size: 1024x1024
    n: 1
    watermark: false
    prompt_extend: true
    output_format: png
    outputDir: generated-images
    requestTimeoutMs: 180000
```

`apiKeyEnv` 指向 DSH 凭据库中的引用名；默认使用模型页已保存的 `SENSENOVA_API_KEY`。密钥也可以在启动环境中导出，凭据库中的值优先。

## 限制

- 生成接口按次计费/消耗配额；公测期有免费额度，以平台控制台为准。
- 返回的临时 URL 24 小时后失效；插件已把图片下载到本地，长期使用请引用 `path`。
- Lite 生成耗时通常十几秒，4K 或多张会更久；Fast 在 512×512 小图上实测约 2 秒。工具超时为 5 分钟。
