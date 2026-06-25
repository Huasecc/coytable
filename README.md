# CoyTable

A Figma plugin for generating beautifully styled tables with real-time preview. Configure rows, columns, styles, and data through an intuitive visual panel — preview changes live and generate directly onto the canvas.

![CoyTable](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=table%20generation%20plugin%20screenshot%20showing%20a%20table%20editor%20panel%20on%20the%20right%20and%20table%20preview%20on%20the%20left%20in%20a%20Figma%20plugin%20ui%20sleek%20modern%20design&image_size=landscape_16_9)

## Features

- **Visual Configuration** — Adjust rows, columns, size, and styles with live preview
- **Inline Cell Editing** — Click to edit, Enter to confirm, Tab to navigate
- **Drag & Drop** — Reorder rows and columns by dragging handles
- **Rich Column Types** — Text, Radio, Checkbox, Index, Image, Progress Bar, Tags, Action Buttons
- **Row / Column Operations** — Insert, duplicate, delete, and align via hover popup menus
- **8 Preset Color Schemes** — Default, Dark, Blue Business, Warm Report, Green Fresh, Pink Warm, Purple Elegant, Gray Minimal
- **12 Data Templates** — User Info, Products, Project Board, Task Tracking, Customer Management, Orders, Bug Tracking, Finance, Meetings, Course Scores, Design Tasks, Recruitment
- **Zebra Stripes** — Toggle alternating row colors
- **Text Wrapping & Alignment** — Left / Center / Right alignment with optional text wrapping
- **i18n** — Chinese & English interface support
- **Dark Mode** — Light / Dark theme toggle
- **Re-edit** — Select an existing CoyTable in Figma to reload and modify
- **One-click Generate** — Send the table directly to your Figma canvas

## Installation

1. Open Figma
2. Go to **Menu → Plugins → Find more plugins**
3. Search for **CoyTable**
4. Click **Install**

Or install via [Community Page](https://www.figma.com/community/plugin/).

## Usage

1. **Configure** table size, rows, columns, and styles in the right panel
2. **Preview** changes in real-time on the left
3. **Edit cells** by clicking directly on the table preview
4. **Drag** row/column handles to reorder
5. **Hover** over handles to access insert, duplicate, delete, and alignment options
6. Click **Generate** to create the table on your Figma canvas

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Confirm cell edit |
| `Esc` | Cancel cell edit |
| `Tab` | Move to next cell |
| `Shift` + `Tab` | Move to previous cell |

## Development

### Project Structure

```
coytable/
├── ui.html          # Plugin UI (HTML + CSS + JS)
├── code.js          # Main thread logic (Figma Plugin API)
├── manifest.json    # Figma plugin manifest
└── .gitignore
```

### Local Development

1. Open Figma → **Plugins → Development → New Plugin**
2. Select **Link existing plugin**
3. Choose the `manifest.json` file from this repo
4. Run the plugin from **Plugins → Development → CoyTable**

### Tech Stack

- **UI**: Vanilla HTML, CSS (CSS custom properties for theming), JavaScript
- **Icons**: [Lucide](https://lucide.dev)
- **Runtime**: Figma Plugin API (sandboxed)

## Author

- **Coy花色** — [coyhuase@qq.com](mailto:coyhuase@qq.com)

## License

This project is proprietary software. All rights reserved.

© 2025-2026 CoyTable. All rights reserved.
