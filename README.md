# 🐾 CoyTable

**A Figma plugin for generating beautiful, customizable tables** — with live preview, drag & drop, rich cell types, and one-click export to canvas.

[![Figma Plugin](https://img.shields.io/badge/Figma-Plugin-blue?logo=figma)](https://www.figma.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## ✨ Features

- 🎨 **Live Preview** — Real-time table preview with grid background; Ctrl+🔄 wheel to zoom
- ✏️ **Inline Cell Editing** — Click any text cell to edit — `Enter` confirm, `Esc` cancel, `Tab` navigate
- 🔄 **Drag & Drop Reorder** — Grab row/column handles (⠿) to reorder freely
- 🏷️ **Rich Column Types** — Text, radio, checkbox, index, image, progress bar, tags, action buttons
- 🎯 **Theme Quick-Switch** — 8 preset color themes via color dots on the top bar
- 📋 **12 Data Templates** — User info, product list, project board, bug tracker, finance, etc.
- 📊 **Excel Import** — Import `.xlsx` / `.xls` / `.csv` files into the table
- 📎 **Clipboard Paste** — Paste tab-separated data from spreadsheets or web tables
- 🌐 **Bilingual UI** — Toggle Chinese / English at the bottom bar
- 🌓 **Dark Mode** — Toggle light/dark theme
- ↩️ **Re-edit Existing Tables** — Select a generated table on canvas to reload and modify
- 🦓 **Zebra Stripes** — Toggle alternating row background colors
- 🎨 **8 Preset Style Templates** — Default, dark, blue business, warm report, green, pink, purple, gray
- 🖱️ **Pan & Zoom** — Spacebar + drag to pan; Ctrl+wheel to zoom (25%–400%)

---

## 🧩 Panel Reference

### 🔝 Top Utility Bar

- 🎯 **Theme dots** — Click a colored dot to instantly apply one of 8 preset themes
- 📝 **Wrap toggle** — Toggle text wrapping on/off for all cells
- ⬅️ **Alignment** — Set horizontal text alignment: left / center / right
- 🔄 **Reset** — Reset all settings to defaults
- ✨ **Generate** — Render the table to the Figma canvas

### 📐 Right Panel — Configuration

#### 📏 Table Size
- 📐 **Table Width / Height** — Set fixed dimensions or auto-fit
- ↔️ **Column Width / Row Height** — Set fixed values or fill remaining space
- 🔢 **Rows / Columns** — Number of rows and columns (1–200 rows, 1–50 cols)

#### 🌍 Global Style
- 🔘 **Corner Radius** — Table border radius (0–20px)
- 🔤 **Font Size** — Cell text size (8–48px)
- 🎨 **Border Colors** — Inner border and outer border colors
- 📏 **Border Width** — Inner and outer border thickness (0–10px)
- 🧾 **Header** — Show or hide the header row

#### 🎯 Header Style
- 🖌️ **Background / Text Color** — Customize header appearance
- 🔠 **Font Weight** — Regular or Semi Bold

#### 📦 Cell Style
- 🖌️ **Background / Text Color** — Body cell appearance
- 📐 **Padding** — Independent top, bottom, left, right padding

#### 🦓 Zebra Stripes
- ✅ **Enable/Disable** — Toggle alternating row highlighting
- 🎨 **Alternate Color** — Set the alternate row background color

#### 🎨 Preset Styles
8 one-click themes:
- ⚪ Default · ⚫ Dark · 🔵 Blue Business · 🟠 Warm Report
- 🟢 Green Fresh · 🩷 Pink Warm · 🟣 Purple Elegant · ⚪ Gray Minimal

#### 📋 Preset Data
12 data templates for quick filling:
- 👤 User Info · 📦 Product List · 📊 Project Board · ✅ Task Tracker
- 🤝 Customer Management · 📑 Order Management · 🐛 Bug Tracker
- 💰 Finance Ledger · 📝 Meeting Notes · ⭐ Course Ratings
- 🎨 Design Tasks · 👥 Recruitment

---

## ✏️ Cell Operations

### ⌨️ Inline Editing

Click any **text-type** cell to start editing:

- `Enter` — ✅ Confirm edit and exit
- `Esc` — ❌ Cancel edit
- `Tab` — ➡️ Move to the next cell
- `Shift` + `Tab` — ⬅️ Move to the previous cell

> 🔘 Radio and checkbox cells toggle between 0/1 on click.
> 🔒 Index, progress, tag, action, and image cells are display-only.

### 🏷️ Column Types

Each column can be set to a specific type via the column handle popup:

- 🔤 **Text** — Plain text, editable inline
- 🔘 **Radio** — Circle (filled/unfilled), toggle on click
- ☑️ **Checkbox** — Square (checked/unchecked), toggle on click
- 🔢 **Index** — Sequential number, auto-generated
- 🖼️ **Image** — Gray placeholder rectangle, display only
- 📊 **Progress** — Bar with percentage label, parsed from value (0–100)
- 🏷️ **Tag** — Colored label with dot, format: `label|color|style`
- 🔧 **Action** — Group of action buttons, configurable count and labels

### 🏷️ Tag Value Format

Tags use a pipe-delimited format within the cell:
```
label|#hexcolor|style
```

Examples:
- `✅ 上架|#22C55E|filled` — Green filled tag
- `⏳ 待办|#F59E0B|ghost` — Amber ghost (outline) tag
- `🔴 P0|#EF4444|filled` — Red priority tag

---

## 🔧 Row & Column Operations

### 📌 Row Handle (⠿ on the left)

- 🔄 **Reorder** — Drag the handle (⠿) up/down
- ⬆️ **Insert above** — Click the handle → popup → **Insert Above**
- ⬇️ **Insert below** — Click the handle → popup → **Insert Below**
- 📋 **Duplicate** — Click the handle → popup → **Copy**
- 🗑️ **Delete** — Click the handle → popup → **Trash** (min 1 row)
- ⬍ **Vertical align** — Click the handle → popup → top / middle / bottom

> 🚫 The header row (if visible) cannot be dragged or reordered.

### 📌 Column Handle (⠿ above the table)

- 🔄 **Reorder** — Drag the handle (⠿) left/right
- ⬅️ **Insert left** — Click the handle → popup → **Insert Left**
- ➡️ **Insert right** — Click the handle → popup → **Insert Right**
- 📋 **Duplicate** — Click the handle → popup → **Copy**
- 🗑️ **Delete** — Click the handle → popup → **Trash** (min 1 column)
- ↔️ **Width** — Click the handle → enter pixel width in the popup
- ⬌ **Horizontal align** — Click the handle → popup → left / center / right
- 🏷️ **Change type** — Click the handle → select cell type icon

### ⚡ Quick Insert

- ➕ **Between rows** — Hover between two rows; a `+` button appears. Click to insert a new row.
- ➕ **Between columns** — Hover the left/right edge of the table area; a `+` button appears. Click to insert. Hover again to choose column type.

---

## 📥 Data Import

### 📊 Excel Import (.xlsx / .xls / .csv)

1. Click **📥 Import Excel** at the bottom bar
2. Select a file from your computer
3. The first sheet is parsed; the first row is treated as the header
4. Trailing empty rows/columns are automatically trimmed

### 📎 Clipboard Paste

1. Copy data from a spreadsheet (Excel, Google Sheets, etc.) — tab-separated format
2. Click **📋 Clipboard Detect** at the bottom bar
3. If the clipboard API is unavailable, follow the prompt and press `Ctrl+V`

---

## ↩️ Re-editing Existing Tables

1. Select a CoyTable-generated table on the Figma canvas
2. A **↩️ Re-edit** bar appears at the bottom of the plugin
3. Click **Re-edit** to load the table data back into the plugin
4. Modify and regenerate

---

## 🖱️ Preview Navigation

- ✋ **Pan** — Hold `Space` + drag mouse
- 🔍 **Zoom in/out** — `Ctrl` + mouse wheel (25%–400%)
- 🔄 **Reset zoom** — `Ctrl+0` or click the zoom percentage button
- 📍 **Zoom indicator** — Appears at bottom when zoom ≠ 100%

---

## 🌐 Internationalization

Toggle between Chinese and English at the bottom bar:

- 🇨🇳 Click **中** for Chinese
- 🇬🇧 Click **EN** for English

All panel labels, tooltips, and buttons update instantly.

---

## ⌨️ Keyboard Shortcuts

- `Enter` — ✏️ Cell editing — ✅ Confirm edit
- `Esc` — ✏️ Cell editing — ❌ Cancel edit
- `Tab` — ✏️ Cell editing — ➡️ Next cell
- `Shift` + `Tab` — ✏️ Cell editing — ⬅️ Previous cell
- `Space` — 🖱️ Preview area — Hold + drag to pan
- `Ctrl` + `Wheel` — 🖱️ Preview area — 🔍 Zoom in/out
- `Ctrl` + `0` — 🌐 Anywhere — 🔄 Reset zoom to 100%

---

## 👨‍💻 Author

**Coy花色** · [coyhuase@qq.com](mailto:coyhuase@qq.com)

© 2025-2026 CoyTable. All rights reserved.

---

<br>

---

<br>

# 🐾 CoyTable

**一款 Figma 表格生成插件** — 实时预览、拖拽编辑、一键生成到画布。

[![Figma Plugin](https://img.shields.io/badge/Figma-Plugin-blue?logo=figma)](https://www.figma.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## ✨ 功能特性

- 🎨 **实时预览** — 网格背景预览区，Ctrl+滚轮缩放，实时查看表格效果
- ✏️ **嵌入编辑** — 点击文本单元格直接编辑，`Enter` 确认、`Esc` 取消、`Tab` 跳格
- 🔄 **拖拽排序** — 拖拽行/列手柄（⠿）自由调整顺序
- 🏷️ **花式列类型** — 文本、单选、复选、序号、图片、进度条、标签、操作按钮
- 🎯 **一键换色** — 顶部 8 种预设主题色块，点击即切换
- 📋 **12 套数据模板** — 用户信息、商品清单、项目看板、Bug 追踪、财务流水等
- 📊 **Excel 导入** — 支持 `.xlsx` / `.xls` / `.csv` 文件导入
- 📎 **剪贴板粘贴** — 从 Excel/表格中复制，一键粘贴识别
- 🌐 **中英双语** — 底部栏一键切换中文/英文界面
- 🌓 **明暗主题** — 一键切换亮色/暗色模式
- ↩️ **回传编辑** — 选中画布上的已有表格，一键载入继续修改
- 🦓 **斑马纹** — 开启后交替行背景色，表格更清晰易读
- 🎨 **8 套预设样式** — 默认、暗黑、蓝色商务、暖色报表、清新绿意等
- 🖱️ **平移缩放** — 空格+拖拽平移，Ctrl+滚轮缩放（25%–400%）

---

## 🧩 面板参考

### 🔝 顶部工具栏

- 🎯 **主题色块** — 点击色块一键切换 8 套预设主题
- 📝 **换行开关** — 开启/关闭单元格文本自动换行
- ⬅️ **对齐** — 设置文字水平对齐：左 / 中 / 右
- 🔄 **重置** — 恢复所有设置为默认值
- ✨ **生成** — 将表格渲染到 Figma 画布

### 📐 右侧面板 — 配置项

#### 📏 表格尺寸
- 📐 **表宽 / 表高** — 固定尺寸或自适应
- ↔️ **列宽 / 行高** — 固定值或填充剩余空间
- 🔢 **行数 / 列数** — 1–200 行，1–50 列

#### 🌍 全局样式
- 🔘 **圆角** — 表格边框圆角（0–20px）
- 🔤 **字号** — 单元格文字大小（8–48px）
- 🎨 **边框颜色** — 内边框和外边框颜色
- 📏 **边框宽度** — 内边框和外边框粗细（0–10px）
- 🧾 **表头** — 显示/隐藏表头行

#### 🎯 表头样式
- 🖌️ **背景 / 文字颜色** — 自定义表头外观
- 🔠 **文字粗细** — 常规或加粗

#### 📦 单元格样式
- 🖌️ **背景 / 文字颜色** — 设置单元格外观
- 📐 **内间距** — 上/下/左/右独立设置

#### 🦓 斑马纹
- ✅ **启用/关闭** — 开启交替行高亮
- 🎨 **交替色** — 设置交替行背景色

#### 🎨 预设样式
8 套一键主题：
- ⚪ 默认标准 · ⚫ 暗黑 · 🔵 蓝色商务 · 🟠 暖色报表
- 🟢 清新绿意 · 🩷 粉色温馨 · 🟣 紫色典雅 · ⚪ 灰色极简

#### 📋 预设数据
12 套快速填充模板：
- 👤 用户信息 · 📦 商品清单 · 📊 项目看板 · ✅ 任务追踪
- 🤝 客户管理 · 📑 订单管理 · 🐛 Bug 追踪
- 💰 财务流水 · 📝 会议纪要 · ⭐ 课程评分
- 🎨 设计任务 · 👥 招聘管理

---

## ✏️ 单元格操作

### ⌨️ 嵌入编辑

点击任意 **文本类型** 单元格即可编辑：

- `Enter` — ✅ 确认编辑
- `Esc` — ❌ 取消编辑
- `Tab` — ➡️ 跳到下一格
- `Shift` + `Tab` — ⬅️ 跳到上一格

> 🔘 单选和复选单元格点击切换 0/1 状态。
> 🔒 序号、进度条、标签、操作按钮、图片单元格为只读。

### 🏷️ 列类型

在列表头弹窗中可为每列设置类型：

- 🔤 **文本** — 纯文字，可嵌入编辑
- 🔘 **单选** — 圆形（填充/空心），点击切换
- ☑️ **复选** — 方形（勾选/未选），点击切换
- 🔢 **序号** — 顺序数字，自动生成
- 🖼️ **图片** — 灰色占位方块，仅显示
- 📊 **进度** — 进度条 + 百分比，从数值解析（0–100）
- 🏷️ **标签** — 彩色标签 + 圆点，格式：`标签|颜色|样式`
- 🔧 **操作** — 操作按钮组，可配置数量和文字

### 🏷️ 标签值格式

标签使用竖线分隔格式：
```
标签|#十六进制颜色|样式
```

示例：
- `✅ 上架|#22C55E|filled` — 绿色实心标签
- `⏳ 待办|#F59E0B|ghost` — 琥珀色描边标签
- `🔴 P0|#EF4444|filled` — 红色优先级标签

---

## 🔧 行列操作

### 📌 行手柄（左侧⠿）

- 🔄 **拖拽排序** — 拖住手柄（⠿）上下移动
- ⬆️ **上方插入** — 点击手柄 → 弹窗 → **上方插入**
- ⬇️ **下方插入** — 点击手柄 → 弹窗 → **下方插入**
- 📋 **复制行** — 点击手柄 → 弹窗 → **复制**
- 🗑️ **删除行** — 点击手柄 → 弹窗 → **删除**（至少保留 1 行）
- ⬍ **垂直对齐** — 点击手柄 → 弹窗 → 顶部 / 居中 / 底部

> 🚫 表头行不可拖拽移动。

### 📌 列手柄（表格上方⠿）

- 🔄 **拖拽排序** — 拖住手柄（⠿）左右移动
- ⬅️ **左侧插入** — 点击手柄 → 弹窗 → **左侧插入**
- ➡️ **右侧插入** — 点击手柄 → 弹窗 → **右侧插入**
- 📋 **复制列** — 点击手柄 → 弹窗 → **复制**
- 🗑️ **删除列** — 点击手柄 → 弹窗 → **删除**（至少保留 1 列）
- ↔️ **列宽** — 点击手柄 → 输入像素宽度
- ⬌ **水平对齐** — 点击手柄 → 弹窗 → 左 / 中 / 右
- 🏷️ **修改类型** — 点击手柄 → 选择列类型图标

### ⚡ 快速插入

- ➕ **行间插入** — 悬停两行之间，出现 `+` 按钮，点击插入新行
- ➕ **列间插入** — 悬停表格左右边缘，出现 `+` 按钮，悬停可提前选择列类型

---

## 📥 数据导入

### 📊 Excel 导入

1. 点击底部栏 **📥 导入 Excel**
2. 选择 `.xlsx` / `.xls` / `.csv` 文件
3. 自动解析第一个工作表，首行作为表头
4. 自动裁剪尾部空行和空列

### 📎 剪贴板识别

1. 从 Excel、Google Sheets 等复制数据（制表符分隔格式）
2. 点击底部栏 **📋 剪贴板识别**
3. 如剪贴板 API 不可用，按提示按 `Ctrl+V` 粘贴

---

## ↩️ 回传编辑

1. 在 Figma 画布上选中已生成的 CoyTable 表格
2. 插件底部出现 **↩️ 回传编辑** 栏
3. 点击「回传编辑」，表格数据载入插件
4. 修改后重新生成

---

## 🖱️ 预览导航

- ✋ **平移** — 按住 `Space` + 拖拽鼠标
- 🔍 **缩放** — `Ctrl` + 滚轮（25%–400%）
- 🔄 **重置缩放** — `Ctrl+0` 或点击缩放百分比按钮
- 📍 **缩放指示** — 非 100% 时底部显示百分比按钮

---

## 🌐 多语言

底部栏一键切换：

- 🇨🇳 点击 **中** 切换为中文
- 🇬🇧 点击 **EN** 切换为英文

所有面板标签、提示文字、按钮文本实时更新。

---

## ⌨️ 快捷键汇总

- `Enter` — ✏️ 编辑单元格 — ✅ 确认编辑
- `Esc` — ✏️ 编辑单元格 — ❌ 取消编辑
- `Tab` — ✏️ 编辑单元格 — ➡️ 跳到下一格
- `Shift` + `Tab` — ✏️ 编辑单元格 — ⬅️ 跳到上一格
- `Space` — 🖱️ 预览区域 — 按住 + 拖拽平移
- `Ctrl` + `Wheel` — 🖱️ 预览区域 — 🔍 缩放
- `Ctrl` + `0` — 🌐 全局 — 🔄 重置缩放为 100%

---

## 👨‍💻 关于作者

**Coy花色** · [coyhuase@qq.com](mailto:coyhuase@qq.com)

© 2025-2026 CoyTable 保留所有权利。
