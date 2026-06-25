# CoyTable

> A Figma plugin for generating beautifully styled tables with real-time preview.
> 一款可视化表格生成 Figma 插件，实时预览、一键生成。

![CoyTable](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=table%20generation%20plugin%20screenshot%20showing%20a%20table%20editor%20panel%20on%20the%20right%20and%20table%20preview%20on%20the%20left%20in%20a%20Figma%20plugin%20ui%20sleek%20modern%20design&image_size=landscape_16_9)

---

## Features / 功能特性

| English | 中文 |
|---------|------|
| **Visual Configuration** — Adjust rows, columns, size, and styles with live preview | **可视化配置** — 行列/尺寸/样式实时预览 |
| **Inline Cell Editing** — Click to edit, Enter to confirm, Tab to navigate | **内联编辑** — 点击编辑，Enter 确认，Tab 跳格 |
| **Drag & Drop** — Reorder rows and columns by dragging handles | **拖拽排序** — 拖拽手柄重排行/列 |
| **Rich Column Types** — Text, Radio, Checkbox, Index, Image, Progress, Tag, Action | **丰富列类型** — 文本/单选/复选/进度/标签/操作按钮等 |
| **Row / Column Operations** — Insert, duplicate, delete via hover popups | **行列操作** — 悬停弹窗插入/复制/删除 |
| **8 Preset Color Schemes** | **8 种预设配色** — 一键切换主题 |
| **12 Data Templates** | **12 种数据模板** — 快速填充示例数据 |
| **Zebra Stripes** — Toggle alternating row colors | **斑马纹** — 交替行背景色 |
| **Text Wrapping & Alignment** — Left/Center/Right | **文字换行与对齐** |
| **i18n** — Chinese & English UI | **中英双语** — 界面语言切换 |
| **Dark Mode** — Light/Dark theme toggle | **明暗主题** — 亮色/暗色切换 |
| **Re-edit** — Modify existing tables on canvas | **回传编辑** — 选中已有表格修改 |
| **One-click Generate** | **一键生成到画布** |

---

## Installation / 安装

**English:**
1. Open Figma → **Menu → Plugins → Find more plugins**
2. Search for **CoyTable**
3. Click **Install**

**中文：**
1. 打开 Figma → **菜单 → 插件 → 查找更多插件**
2. 搜索 **CoyTable**
3. 点击 **安装**

---

## Usage / 使用说明

**English:**
1. **Configure** table size, rows, columns, and styles in the right panel
2. **Preview** changes in real-time on the left
3. **Edit cells** by clicking directly on the table preview
4. **Drag** row/column handles to reorder
5. **Hover** over handles to access insert, duplicate, delete, and alignment options
6. Click **Generate** to create the table on your Figma canvas

**中文：**
1. **配置** — 在右侧面板调整表格尺寸、行列和样式
2. **预览** — 左侧实时显示效果
3. **编辑** — 点击表格单元格直接修改内容
4. **拖拽** — 拖拽行/列手柄调整顺序
5. **悬停** — 悬停手柄弹出操作菜单（插入/复制/删除/对齐）
6. **生成** — 点击"生成到画布"发送到 Figma

### Keyboard Shortcuts / 快捷键

| Key | Action / 操作 |
|-----|---------------|
| `Enter` | Confirm edit / 确认编辑 |
| `Esc` | Cancel edit / 取消编辑 |
| `Tab` | Next cell / 下一格 |
| `Shift` + `Tab` | Previous cell / 上一格 |

---

## Project Structure / 项目结构

```
coytable/
├── ui.html          # Plugin UI (HTML + CSS + JS) / 插件界面
├── code.js          # Main thread logic (Figma Plugin API) / 主线程逻辑
├── manifest.json    # Figma plugin manifest / 插件清单
└── README.md        # This file / 本文件
```

## Local Development / 本地开发

**English:**
1. Open Figma → **Plugins → Development → New Plugin**
2. Select **Link existing plugin**
3. Choose the `manifest.json` file from this repo
4. Run from **Plugins → Development → CoyTable**

**中文：**
1. 打开 Figma → **插件 → 开发 → 新插件**
2. 选择 **链接现有插件**
3. 选择本仓库的 `manifest.json`
4. 从 **插件 → 开发 → CoyTable** 运行

### Tech Stack / 技术栈

- **UI**: Vanilla HTML, CSS (Custom Properties), JavaScript
- **Icons**: [Lucide](https://lucide.dev)
- **Runtime**: Figma Plugin API

---

## Author / 作者

- **Coy花色** — [coyhuase@qq.com](mailto:coyhuase@qq.com)

## License / 许可

All rights reserved. / 版权所有。

© 2025-2026 CoyTable. All rights reserved.
