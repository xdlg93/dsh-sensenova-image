window.__ModuleLoader__.load({
  id: 'dsh-sensenova-image',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const NS = 'sensenova-image'

    const zh = {
      nav: 'SenseNova 文生图',
      title: 'SenseNova 文生图',
      intro: '设置默认请求参数。智能体调用 sensenova_generate_image 时，未显式传入的参数会使用这里的值。',
      model: '模型',
      modelHint: 'Lite 质量优先，适合海报、信息图、成品图；Fast 延迟更低，适合快速预览和批量草稿。',
      modelLite: 'sensenova-u1.5-lite — 质量优先',
      modelFast: 'sensenova-u1.5-fast — 低延迟',
      size: '尺寸 / 分辨率',
      sizeHint: '本接口没有单独的 resolution 参数，size 就是输出分辨率。默认 2048×2048；宽高需为 512–4096、32 的倍数，比例不超过 3:1。',
      size2048x2048: '2048×2048 ｜ 1:1 ｜ 2K（默认）',
      size2720x1536: '2720×1536 ｜ 16:9 ｜ 2K',
      size1536x2720: '1536×2720 ｜ 9:16 ｜ 2K',
      size1664x2496: '1664×2496 ｜ 2:3 ｜ 2K',
      size2496x1664: '2496×1664 ｜ 3:2 ｜ 2K',
      size4096x4096: '4096×4096 ｜ 1:1 ｜ 4K',
      custom: '自定义尺寸',
      customHint: '输入“宽x高”，例如 2720x1536。',
      n: '生成张数',
      nHint: '一次生成 1–4 张；张数越多，耗时和配额消耗越高。',
      nUnit: '张',
      watermark: '水印',
      watermarkHint: '开启后图片带平台水印；公测期关闭可生成无水印原图。',
      promptExtend: '提示词自动扩写',
      promptExtendHint: '开启后服务端会扩写提示词，细节更丰富；关闭则严格按原文生成。',
      format: '输出格式',
      formatHint: 'PNG 无损、体积较大；JPEG / WebP 体积更小，适合网页和分享。',
      outputDir: '保存目录',
      outputDirHint: '相对会话工作目录；默认 generated-images。',
      on: '开启',
      off: '关闭',
      save: '保存设置',
      reset: '重置',
      saved: '已保存，下一次工具调用生效。',
      saving: '保存中…',
      failed: '保存失败，请重试。',
      invalid: '参数不合法：',
      loading: '加载设置…',
      unavailable: '设置服务暂不可用。',
      readOnly: '当前配置不可写。',
      sizeInvalid: '尺寸需为 2K/4K 或“宽x高”，宽高 512–4096、32 的倍数、比例不超过 3:1。',
      nInvalid: '生成张数需为 1–4。',
      formatInvalid: '输出格式需为 png、jpeg 或 webp。',
    }

    const en = {
      nav: 'SenseNova image',
      title: 'SenseNova image generation',
      intro: 'Set the default request parameters. When an agent calls sensenova_generate_image without an explicit value, the value here is used.',
      model: 'Model',
      modelHint: 'Lite favors quality for posters, infographics, and final images. Fast has lower latency for previews and batch drafts.',
      modelLite: 'sensenova-u1.5-lite — quality-focused',
      modelFast: 'sensenova-u1.5-fast — lower latency',
      size: 'Size / resolution',
      sizeHint: 'This API has no separate resolution parameter: size is the output resolution. The default is 2048×2048; width and height must be 512-4096, multiples of 32, and at most 3:1 apart.',
      size2048x2048: '2048×2048 | 1:1 | 2K (default)',
      size2720x1536: '2720×1536 | 16:9 | 2K',
      size1536x2720: '1536×2720 | 9:16 | 2K',
      size1664x2496: '1664×2496 | 2:3 | 2K',
      size2496x1664: '2496×1664 | 3:2 | 2K',
      size4096x4096: '4096×4096 | 1:1 | 4K',
      custom: 'Custom size',
      customHint: 'Enter WIDTHxHEIGHT, for example 2720x1536.',
      n: 'Images per call',
      nHint: 'Generate 1-4 images per call; more images take longer and consume more quota.',
      nUnit: 'image(s)',
      watermark: 'Watermark',
      watermarkHint: 'Adds the platform watermark. Leave it off during the free public beta for a clean original.',
      promptExtend: 'Prompt auto-extend',
      promptExtendHint: 'Lets the provider expand and refine the prompt for richer detail; off follows the prompt literally.',
      format: 'Output format',
      formatHint: 'PNG is lossless and larger; JPEG and WebP are smaller for the web and sharing.',
      outputDir: 'Save directory',
      outputDirHint: 'Relative to the session working directory; defaults to generated-images.',
      on: 'On',
      off: 'Off',
      save: 'Save settings',
      reset: 'Reset',
      saved: 'Saved. Applies to the next tool call.',
      saving: 'Saving…',
      failed: 'Save failed. Please retry.',
      invalid: 'Invalid parameter: ',
      loading: 'Loading settings…',
      unavailable: 'Settings service is unavailable.',
      readOnly: 'This configuration is read-only.',
      sizeInvalid: 'Size must be 2K/4K or WIDTHxHEIGHT with both sides 512-4096, multiples of 32, and at most 3:1 apart.',
      nInvalid: 'Images per call must be 1-4.',
      formatInvalid: 'Output format must be png, jpeg, or webp.',
    }

    const PRESETS = [
      { value: '2048x2048', key: 'size2048x2048' },
      { value: '2720x1536', key: 'size2720x1536' },
      { value: '1536x2720', key: 'size1536x2720' },
      { value: '1664x2496', key: 'size1664x2496' },
      { value: '2496x1664', key: 'size2496x1664' },
      { value: '4096x4096', key: 'size4096x4096' },
    ]
    const PRESET_VALUES = new Set(PRESETS.map(preset => preset.value))
    const FORMATS = ['png', 'jpeg', 'webp']

    function validateSize(raw) {
      const size = String(raw ?? '').trim()
      if (/^(2k|4k)$/i.test(size)) return size.toUpperCase()
      const match = /^(\d{3,4})x(\d{3,4})$/i.exec(size)
      if (match === null) return null
      const width = Number(match[1])
      const height = Number(match[2])
      if (width < 512 || width > 4096 || height < 512 || height > 4096) return null
      if (width % 32 !== 0 || height % 32 !== 0) return null
      if (Math.max(width, height) / Math.min(width, height) > 3) return null
      return `${width}x${height}`
    }

    const CSS = `
      .sn-section { display: flex; flex-direction: column; gap: 18px; width: 100%; max-width: 760px; color: var(--dsw-alias-label-primary); }
      .sn-head { display: flex; flex-direction: column; gap: 6px; }
      .sn-title-lg { font-size: 16px; line-height: 24px; font-weight: 600; }
      .sn-intro { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
      .sn-card { display: flex; flex-direction: column; }
      .sn-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 28px; padding: 16px 0; border-bottom: 0.5px solid var(--dsw-alias-border-l2); }
      .sn-row:last-child { border-bottom: none; }
      .sn-row-text { min-width: 0; flex: 1 1 auto; }
      .sn-label { font-size: 14px; line-height: 20px; }
      .sn-hint { margin-top: 4px; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
      .sn-control { flex: 0 0 280px; display: flex; flex-direction: column; gap: 8px; }
      .sn-stack { display: flex; flex-direction: column; gap: 8px; }
      .sn-select, .sn-input { width: 100%; box-sizing: border-box; padding: 7px 10px; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; line-height: 18px; }
      .sn-select:focus, .sn-input:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }
      .sn-select:disabled, .sn-input:disabled { opacity: 0.6; cursor: not-allowed; }
      .sn-mini-hint { color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 16px; }
      .sn-toggle-wrap { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
      .sn-toggle-text { color: var(--dsw-alias-label-secondary); font-size: 12px; }
      .sn-switch { position: relative; flex: none; width: 42px; height: 24px; padding: 0; border-radius: 999px; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2); cursor: pointer; transition: background .15s ease, border-color .15s ease; }
      .sn-switch[aria-checked="true"] { background: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); }
      .sn-switch:disabled { opacity: 0.6; cursor: not-allowed; }
      .sn-switch span { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.2); transition: transform .15s ease; }
      .sn-switch[aria-checked="true"] span { transform: translateX(18px); }
      .sn-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
      .sn-btn { padding: 7px 14px; border-radius: 8px; font: inherit; font-size: 13px; line-height: 18px; cursor: pointer; }
      .sn-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      .sn-btn-primary { border: 1px solid var(--dsw-alias-brand-primary); background: var(--dsw-alias-brand-primary); color: #fff; }
      .sn-btn-secondary { border: 1px solid var(--dsw-alias-border-l2); background: transparent; color: var(--dsw-alias-label-primary); }
      .sn-status { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
      .sn-error { color: var(--dsw-alias-state-error-primary); }
      @media (max-width: 640px) {
        .sn-row { flex-direction: column; gap: 10px; }
        .sn-control { flex: 1 1 auto; width: 100%; }
        .sn-toggle-wrap { justify-content: flex-start; }
      }
    `

    function Toggle({ checked, disabled, label, onChange }) {
      return h('div', { className: 'sn-toggle-wrap' },
        h('button', {
          type: 'button',
          role: 'switch',
          'aria-checked': checked === true,
          'aria-label': label,
          disabled,
          className: 'sn-switch',
          onClick: () => onChange(!(checked === true)),
        }, h('span', null)),
        h('span', { className: 'sn-toggle-text' }, checked === true ? '●' : '○'),
      )
    }

    function Section({ form, t }) {
      const [snapshot, setSnapshot] = React.useState(() => form.getSnapshot())
      const [draft, setDraft] = React.useState(null)
      const [status, setStatus] = React.useState('idle')
      const [error, setError] = React.useState('')
      const [customMode, setCustomMode] = React.useState(false)

      React.useEffect(() => form.subscribe(() => setSnapshot(form.getSnapshot())), [form])

      const value = snapshot.value ?? {}
      const current = draft ?? value
      const writable = snapshot.writable !== false
      const busy = status === 'saving'

      const set = (key, next) => {
        setStatus('idle')
        setError('')
        setDraft({ ...(draft ?? value), [key]: next })
      }

      const save = async () => {
        if (!writable || busy) return
        const next = { ...current }
        const size = validateSize(next.size)
        if (size === null) {
          setStatus('error')
          setError(t('invalid') + t('sizeInvalid'))
          return
        }
        next.size = size
        const n = Number(next.n)
        if (!Number.isInteger(n) || n < 1 || n > 4) {
          setStatus('error')
          setError(t('invalid') + t('nInvalid'))
          return
        }
        next.n = n
        if (!FORMATS.includes(next.output_format)) {
          setStatus('error')
          setError(t('invalid') + t('formatInvalid'))
          return
        }
        next.outputDir = String(next.outputDir ?? '').trim() || 'generated-images'
        const ops = []
        for (const key of ['model', 'size', 'n', 'watermark', 'prompt_extend', 'output_format', 'outputDir']) {
          if (next[key] !== value[key]) ops.push({ op: 'set', path: [key], value: next[key] })
        }
        if (ops.length === 0) {
          setStatus('saved')
          setDraft(null)
          return
        }
        setStatus('saving')
        setError('')
        try {
          const ok = await form.mutate(ops)
          if (ok) {
            setStatus('saved')
            setDraft(null)
            setCustomMode(false)
          } else {
            setStatus('error')
            setError(t('failed'))
          }
        } catch (_failure) {
          setStatus('error')
          setError(t('failed'))
        }
      }

      if (snapshot.status === 'unavailable') {
        return h('div', { className: 'sn-section' }, h('div', { className: 'sn-hint' }, t('unavailable')))
      }
      if (snapshot.status === 'loading' && snapshot.value === undefined) {
        return h('div', { className: 'sn-section' }, h('div', { className: 'sn-hint' }, t('loading')))
      }

      const model = current.model ?? 'sensenova-u1.5-lite'
      const size = current.size ?? '2048x2048'
      const n = current.n ?? 1
      const watermark = current.watermark === true
      const promptExtend = current.prompt_extend !== false
      const format = current.output_format ?? 'png'
      const outputDir = current.outputDir ?? 'generated-images'
      const showCustom = customMode || !PRESET_VALUES.has(size)
      const sizeSelectValue = showCustom ? 'custom' : size

      const row = (label, hint, control) => h('div', { className: 'sn-row' },
        h('div', { className: 'sn-row-text' },
          h('div', { className: 'sn-label' }, label),
          h('div', { className: 'sn-hint' }, hint),
        ),
        h('div', { className: 'sn-control' }, control),
      )

      return h('div', { className: 'sn-section' },
        h('style', null, CSS),
        h('div', { className: 'sn-head' },
          h('div', { className: 'sn-title-lg' }, t('title')),
          h('div', { className: 'sn-intro' }, t('intro')),
        ),
        h('div', { className: 'sn-card' },
          row(t('model'), t('modelHint'), h('select', {
            className: 'sn-select',
            value: model,
            disabled: !writable || busy,
            onChange: event => set('model', event.target.value),
          },
          h('option', { value: 'sensenova-u1.5-lite' }, t('modelLite')),
          h('option', { value: 'sensenova-u1.5-fast' }, t('modelFast')),
          )),
          row(t('size'), t('sizeHint'), h('div', { className: 'sn-stack' },
            h('select', {
              className: 'sn-select',
              value: sizeSelectValue,
              disabled: !writable || busy,
              onChange: event => {
                if (event.target.value === 'custom') {
                  setCustomMode(true)
                  if (!size) set('size', '2048x2048')
                } else {
                  setCustomMode(false)
                  set('size', event.target.value)
                }
              },
            },
            PRESETS.map(preset => h('option', { key: preset.value, value: preset.value }, t(preset.key))),
            h('option', { value: 'custom' }, t('custom')),
            ),
            showCustom ? h('input', {
              className: 'sn-input',
              value: size,
              disabled: !writable || busy,
              placeholder: '2720x1536',
              onChange: event => set('size', event.target.value),
            }) : null,
            showCustom ? h('div', { className: 'sn-mini-hint' }, t('customHint')) : null,
          )),
          row(t('n'), t('nHint'), h('select', {
            className: 'sn-select',
            value: String(n),
            disabled: !writable || busy,
            onChange: event => set('n', Number(event.target.value)),
          }, [1, 2, 3, 4].map(count => h('option', { key: count, value: String(count) }, `${count} ${t('nUnit')}`)))),
          row(t('watermark'), t('watermarkHint'), h(Toggle, {
            checked: watermark,
            disabled: !writable || busy,
            label: t('watermark'),
            onChange: next => set('watermark', next),
          })),
          row(t('promptExtend'), t('promptExtendHint'), h(Toggle, {
            checked: promptExtend,
            disabled: !writable || busy,
            label: t('promptExtend'),
            onChange: next => set('prompt_extend', next),
          })),
          row(t('format'), t('formatHint'), h('select', {
            className: 'sn-select',
            value: format,
            disabled: !writable || busy,
            onChange: event => set('output_format', event.target.value),
          }, FORMATS.map(item => h('option', { key: item, value: item }, item.toUpperCase())))),
          row(t('outputDir'), t('outputDirHint'), h('input', {
            className: 'sn-input',
            value: outputDir,
            disabled: !writable || busy,
            onChange: event => set('outputDir', event.target.value),
          })),
        ),
        h('div', { className: 'sn-actions' },
          h('button', {
            type: 'button',
            className: 'sn-btn sn-btn-primary',
            disabled: !writable || busy,
            onClick: save,
          }, busy ? t('saving') : t('save')),
          h('button', {
            type: 'button',
            className: 'sn-btn sn-btn-secondary',
            disabled: busy,
            onClick: () => {
              setDraft(null)
              setStatus('idle')
              setError('')
              setCustomMode(false)
            },
          }, t('reset')),
          status === 'saved' ? h('span', { className: 'sn-status' }, t('saved')) : null,
          status === 'error' ? h('span', { className: 'sn-status sn-error', role: 'alert' }, error) : null,
          !writable ? h('span', { className: 'sn-status' }, t('readOnly')) : null,
        ),
      )
    }

    return {
      inject: ['slots', 'locale', 'configForms'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-sensenova-image: locale')
        const t = ctx.locale.bind(NS)
        const form = ctx.configForms.get(NS)
        ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section',
          id: 'sensenova-image',
          order: 30,
          label: () => t('nav'),
          inject: () => ({ form, t }),
        }, Section))
      },
    }
  },
})
