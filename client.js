window.__ModuleLoader__.load({
  id: 'dsh-sensenova-image',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const NS = 'sensenova-image'
    const USER_API_KEY_REF = 'SENSENOVA_IMAGE_API_KEY'

    const zh = {
      nav: 'SenseNova 文生图（U1.6 Lite）',
      title: 'SenseNova 文生图（U1.6 Lite）',
      intro: '设置默认请求参数。生成后会用 sensenova-6.8-flash 做视觉核对；智能体调用 sensenova_generate_image 时，未显式传入的参数会使用这里的值。',
      apiKey: 'API Key',
      apiKeyHint: '默认使用当前配置的 SENSENOVA_API_KEY；填写并保存后优先使用你的 Key。Key 保存在 DSH 凭据库，不会写入配置文件。',
      apiKeyPlaceholder: 'sk-...',
      apiKeyDefault: '未设置自定义 Key，使用默认配置。',
      apiKeyConfigured: '已设置自定义 Key，优先使用它。',
      apiKeySave: '保存 Key',
      apiKeyClear: '清除',
      apiKeySaving: '保存中…',
      apiKeySaved: 'Key 已保存。',
      apiKeyCleared: '已清除，恢复默认配置。',
      apiKeyFailed: 'Key 保存失败，请重试。',
      apiKeyBlank: 'Key 不能为空。',
      apiKeyReadOnly: '当前凭据不可写。',
      size: '尺寸 / 分辨率',
      sizeHint: '本接口没有单独的 resolution 参数，size 就是输出分辨率。默认 auto；也可选 2K/4K 或自定义宽高（512–4096、32 的倍数、比例不超过 3:1）。',
      sizeAuto: 'auto — 自动（默认）',
      size2048x2048: '2048×2048 ｜ 1:1 ｜ 2K',
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
      promptExtend: '提示词自动润色/扩写（prompt_extend）',
      promptExtendHint: '服务端自动润色/扩写提示词；扩写失败时自动使用原始 prompt。与原来的“自动扩写”是同一个参数。',
      selfCorrection: '文字与画质增强（self_correction）',
      selfCorrectionHint: '提升图中文字的准确性和整体画质；默认开启。',
      verification: '视觉核对（sensenova-6.8-flash）',
      verificationHint: '默认开启。每张生成图都会调用 sensenova-6.8-flash 检查是否满足提示词；核对失败不影响图片保存。',
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
      nav: 'SenseNova image (U1.6 Lite)',
      title: 'SenseNova image (U1.6 Lite)',
      intro: 'Set the default request parameters. Each generated image is checked with sensenova-6.8-flash; when an agent calls sensenova_generate_image without an explicit value, the value here is used.',
      apiKey: 'API key',
      apiKeyHint: 'Uses the configured SENSENOVA_API_KEY by default. A key saved here takes precedence. The key is stored in the DSH credential store, never in the plugin configuration.',
      apiKeyPlaceholder: 'sk-...',
      apiKeyDefault: 'No custom key; using the default configuration.',
      apiKeyConfigured: 'A custom key is saved and takes precedence.',
      apiKeySave: 'Save key',
      apiKeyClear: 'Clear',
      apiKeySaving: 'Saving…',
      apiKeySaved: 'Key saved.',
      apiKeyCleared: 'Cleared; back to the default configuration.',
      apiKeyFailed: 'Could not save the key. Please retry.',
      apiKeyBlank: 'The key must not be blank.',
      apiKeyReadOnly: 'This credential is read-only.',
      size: 'Size / resolution',
      sizeHint: 'This API has no separate resolution parameter: size is the output resolution. The default is auto; 2K/4K presets and custom WIDTHxHEIGHT (512-4096, multiples of 32, at most 3:1) are also available.',
      sizeAuto: 'auto — automatic (default)',
      size2048x2048: '2048×2048 | 1:1 | 2K',
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
      promptExtend: 'Prompt polish/expand (prompt_extend)',
      promptExtendHint: 'The provider polishes/expands the prompt automatically and falls back to the original prompt if expansion fails. This is the same parameter as the previous auto-extend.',
      selfCorrection: 'Text and quality enhancement (self_correction)',
      selfCorrectionHint: 'Improves text accuracy and overall image quality; on by default.',
      verification: 'Visual check (sensenova-6.8-flash)',
      verificationHint: 'On by default. Each generated image is checked against the prompt with sensenova-6.8-flash; a failed check does not discard the image.',
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
      { value: 'auto', key: 'sizeAuto' },
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
      if (size.toLowerCase() === 'auto') return 'auto'
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
      .sn-btn-small { padding: 5px 10px; font-size: 12px; }
      .sn-key-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
      .sn-key-state { color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 16px; }
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

    function Section({ form, t, credentials }) {
      const [snapshot, setSnapshot] = React.useState(() => form.getSnapshot())
      const [draft, setDraft] = React.useState(null)
      const [status, setStatus] = React.useState('idle')
      const [error, setError] = React.useState('')
      const [customMode, setCustomMode] = React.useState(false)
      const [keyDraft, setKeyDraft] = React.useState('')
      const [keyInfo, setKeyInfo] = React.useState({ configured: false, writable: true })
      const [keyStatus, setKeyStatus] = React.useState('idle')
      const [keyError, setKeyError] = React.useState('')

      React.useEffect(() => form.subscribe(() => setSnapshot(form.getSnapshot())), [form])

      React.useEffect(() => {
        if (credentials === undefined) return
        let active = true
        const load = async () => {
          try {
            const result = await credentials.describe([USER_API_KEY_REF])
            if (!active || !result.ok) return
            setKeyInfo(result.value[USER_API_KEY_REF] ?? { configured: false, writable: true })
          } catch (_failure) {
            if (active) setKeyInfo({ configured: false, writable: false })
          }
        }
        void load()
        return () => { active = false }
      }, [credentials])

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
        for (const key of ['size', 'n', 'watermark', 'prompt_extend', 'self_correction', 'verify', 'output_format', 'outputDir']) {
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

      const saveKey = async () => {
        if (!writable || keyInfo.writable === false) return
        const value = keyDraft.trim()
        if (value === '') {
          setKeyStatus('error')
          setKeyError(t('apiKeyBlank'))
          return
        }
        setKeyStatus('saving')
        setKeyError('')
        try {
          await credentials.set(USER_API_KEY_REF, value)
          const result = await credentials.describe([USER_API_KEY_REF])
          if (result.ok) setKeyInfo(result.value[USER_API_KEY_REF] ?? { configured: true, writable: true })
          setKeyDraft('')
          setKeyStatus('saved')
        } catch (_failure) {
          setKeyStatus('error')
          setKeyError(t('apiKeyFailed'))
        }
      }

      const clearKey = async () => {
        if (keyInfo.writable === false) return
        setKeyStatus('saving')
        setKeyError('')
        try {
          await credentials.unset(USER_API_KEY_REF)
          const result = await credentials.describe([USER_API_KEY_REF])
          if (result.ok) setKeyInfo(result.value[USER_API_KEY_REF] ?? { configured: false, writable: true })
          setKeyStatus('cleared')
        } catch (_failure) {
          setKeyStatus('error')
          setKeyError(t('apiKeyFailed'))
        }
      }

      if (snapshot.status === 'unavailable') {
        return h('div', { className: 'sn-section' }, h('div', { className: 'sn-hint' }, t('unavailable')))
      }
      if (snapshot.status === 'loading' && snapshot.value === undefined) {
        return h('div', { className: 'sn-section' }, h('div', { className: 'sn-hint' }, t('loading')))
      }

      const size = current.size ?? 'auto'
      const n = current.n ?? 1
      const watermark = current.watermark === true
      const promptExtend = current.prompt_extend !== false
      const selfCorrection = current.self_correction !== false
      const verify = current.verify !== false
      const format = current.output_format ?? 'png'
      const outputDir = current.outputDir ?? 'generated-images'
      const showCustom = customMode || !PRESET_VALUES.has(size)
      const sizeSelectValue = showCustom ? 'custom' : size
      const keyConfigured = keyInfo.configured === true
      const keyWritable = keyInfo.writable !== false
      const keyBusy = keyStatus === 'saving'

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
          row(t('apiKey'), t('apiKeyHint'), h('div', { className: 'sn-stack' },
            h('input', {
              className: 'sn-input',
              type: 'password',
              autoComplete: 'new-password',
              value: keyDraft,
              disabled: !writable || keyBusy || !keyWritable,
              placeholder: keyConfigured ? (keyInfo.masked ?? '••••••••') : t('apiKeyPlaceholder'),
              onChange: event => {
                setKeyDraft(event.target.value)
                setKeyStatus('idle')
                setKeyError('')
              },
            }),
            h('div', { className: 'sn-key-actions' },
              h('button', {
                type: 'button',
                className: 'sn-btn sn-btn-primary sn-btn-small',
                disabled: !writable || keyBusy || !keyWritable || keyDraft.trim() === '',
                onClick: saveKey,
              }, keyBusy ? t('apiKeySaving') : t('apiKeySave')),
              keyConfigured ? h('button', {
                type: 'button',
                className: 'sn-btn sn-btn-secondary sn-btn-small',
                disabled: !writable || keyBusy || !keyWritable,
                onClick: clearKey,
              }, t('apiKeyClear')) : null,
              h('span', { className: 'sn-key-state' }, keyConfigured ? t('apiKeyConfigured') : t('apiKeyDefault')),
            ),
            keyStatus === 'saved' ? h('div', { className: 'sn-mini-hint' }, t('apiKeySaved')) : null,
            keyStatus === 'cleared' ? h('div', { className: 'sn-mini-hint' }, t('apiKeyCleared')) : null,
            keyStatus === 'error' ? h('div', { className: 'sn-mini-hint sn-error', role: 'alert' }, keyError) : null,
            keyConfigured && keyInfo.masked ? h('div', { className: 'sn-mini-hint' }, keyInfo.masked) : null,
            !keyWritable ? h('div', { className: 'sn-mini-hint sn-error' }, t('apiKeyReadOnly')) : null,
          )),
          row(t('verification'), t('verificationHint'), h(Toggle, {
            checked: verify,
            disabled: !writable || busy,
            label: t('verification'),
            onChange: next => set('verify', next),
          })),
          row(t('size'), t('sizeHint'), h('div', { className: 'sn-stack' },
            h('select', {
              className: 'sn-select',
              value: sizeSelectValue,
              disabled: !writable || busy,
              onChange: event => {
                if (event.target.value === 'custom') {
                  setCustomMode(true)
                  if (!size) set('size', 'auto')
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
          row(t('selfCorrection'), t('selfCorrectionHint'), h(Toggle, {
            checked: selfCorrection,
            disabled: !writable || busy,
            label: t('selfCorrection'),
            onChange: next => set('self_correction', next),
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
      inject: ['slots', 'locale', 'configForms', 'remote', 'remote.credentials'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-sensenova-image: locale')
        const t = ctx.locale.bind(NS)
        const form = ctx.configForms.get(NS)
        ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section',
          id: 'sensenova-image',
          order: 30,
          label: () => t('nav'),
          inject: () => ({ form, t, credentials: ctx.remote.credentials }),
        }, Section))
      },
    }
  },
})
