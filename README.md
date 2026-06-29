# CoyTable

**A Figma plugin for generating beautiful, customizable tables** — with live preview, drag & drop, rich cell types, and one-click export to canvas.

[![Figma Plugin](https://img.shields.io/badge/Figma-Plugin-blue?logo=figma)](https://www.figma.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## Features

| Feature | Description |
|---------|-------------|
| **Live Preview** | Adjust rows, columns, size, colors & styles — see changes instantly |
| **Inline Editing** | Click any cell to edit text; `Enter` to confirm, `Tab` to jump |
| **Drag & Drop** | Grab row/column handles to reorder freely |
| **Rich Column Types** | Text, radio, checkbox, index, progress bar, tags, action buttons |
| **Insert Rows/Columns** | Hover between rows for a `+` button to insert new ones |
| **Alignment Control** | Set text alignment (left/center/right) per row or column |
| **Zebra Stripes** | Toggle alternating row colors for cleaner tables |
| **Dark Mode** | Switch between light and dark themes |
| **Bilingual UI** | Toggle Chinese / English |
| **8 Preset Themes** | Default, dark, blue business, warm report, fresh green, etc. |
| **12 Data Templates** | User info, product list, project board, bug tracker, etc. |
| **Re-edit Existing Tables** | Select a generated table on canvas to reload and modify |

---

## How to Use

```
① Configure → ② Preview → ③ Generate
```

1. **Style** — Set rows, columns, size, colors, fonts in the right panel
2. **Preview** — See the table update in real time on the left
3. **Edit Content** — Double-click any cell to type text
4. **Reorder** — Drag handles to rearrange rows & columns
5. **Add / Remove** — Hover a handle for insert, duplicate, or delete
6. **Align** — Use the toolbar or handle popup to adjust alignment
7. **Generate** — Click "Generate" — the table appears on your canvas

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Confirm edit |
| `Esc` | Cancel edit |
| `Tab` | Next cell |
| `Shift` + `Tab` | Previous cell |

---

## Tips

- **First time?** The help guide pops up automatically (shows once only)
- **Quick theme** — Click the colored dots on the top bar to switch themes instantly
- **Demo data** — Pick a template from the "Preset Data" panel to fill content
- **Dark mode** — Designer-friendly late-night mode
- **Re-edit tables** — Select a generated table on canvas to edit again

---

## 简介

CoyTable 是一款 Figma 表格生成插件，提供**实时预览、拖拽编辑、一键生成到画布**的完整体验。

### 功能特性

| 功能 | 说明 |
|------|------|
| **可视化配置** | 在右侧面板调整行列、尺寸、颜色和样式，左侧实时预览 |
| **点击编辑** | 直接点表格里的格子就能改文字，`Enter` 确认、`Tab` 跳格 |
| **拖拽排序** | 拖住行或列左边的小手柄，随意调整顺序 |
| **花式列类型** | 文本、单选、复选、序号、进度条、标签、操作按钮等 |
| **插入行列** | 行与行之间悬停会出现 `+`，点击插入新行 |
| **对齐控制** | 每行每列都可单独设置文字对齐（左/中/右） |
| **斑马纹** | 一键开启交替行背景色，表格更清晰 |
| **明暗主题** | 一键切换亮色/暗色模式 |
| **中英双语** | 右上角一键切换界面语言 |
| **8 套预设配色** | 默认、暗黑、蓝色商务、暖色报表、清新绿意等 |
| **12 套数据模板** | 用户信息、商品清单、项目看板、Bug 追踪等 |
| **回传编辑** | 选中画布上已有的表格，一键载入继续修改 |

### 使用方法

1. **调样式** — 在右侧面板设置行列数、尺寸、颜色、字体等
2. **看效果** — 左侧表格实时更新，所见即所得
3. **改内容** — 双击表格格子直接输入文字
4. **调顺序** — 拖拽手柄调整行列
5. **增删改** — 悬停手柄弹出菜单可插入、复制、删除
6. **对齐** — 顶部工具栏或手柄弹窗调整文字对齐
7. **生成** — 点击「生成到画布」，表格立刻出现在 Figma 中

### 快捷键

| 按键 | 用途 |
|------|------|
| `Enter` | 确认编辑 |
| `Esc` | 取消编辑 |
| `Tab` | 跳到下一格 |
| `Shift` + `Tab` | 跳到上一格 |

---

## Project Structure

```
CoyTable/
├── manifest.json        # Figma plugin manifest
├── code.js              # Plugin main thread (table generation, style, cell ops)
├── ui.html              # Plugin UI (preview, config panel, toolbar)
├── fix_unicode.js       # Utility to fix unicode encoding issues
├── icon.png             # Plugin icon
└── README.md            # This file
```

## Development

This is a Figma plugin. To use it:

1. Open **Figma** → **Plugins** → **Development** → **Import plugin from manifest**
2. Select `manifest.json`
3. Run the plugin from the Figma menu

> Requires network access to load the Lucide icon library from `cdn.jsdelivr.net`.

---

## License

© 2025-2026 CoyTable · [Coy花色](mailto:coyhuase@qq.com)

---

## Repository Mirrors

- **GitHub** — [Huasecc/coytable](https://github.com/Huasecc/coytable) (documentation only)
- **Gitee** — [coy-huase/coy-table](https://gitee.com/coy-huase/coy-table) (full source code)
