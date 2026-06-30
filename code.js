/**
 * CoyTable — Figma Plugin Main Thread
 * Pure visual table generator. No data/business logic.
 * Handles: generation, selection detection, style re-edit, resize.
 */

const TAG = 'coytable';
const _logWarn = (ctx, e) => { try { console.warn('[CoyTable]', ctx, e && e.message); } catch(ex) {} };

// ═══ Color Helpers ═══

function hexToRgb(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return {
    r: parseInt(h.substring(0, 2), 16) / 255,
    g: parseInt(h.substring(2, 4), 16) / 255,
    b: parseInt(h.substring(4, 6), 16) / 255
  };
}

function fill(hex) { return { type: 'SOLID', color: hexToRgb(hex) }; }

// ═══ Plugin Data ═══

function getData(node) {
  try {
    const raw = node.getPluginData(TAG);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { _logWarn('getPluginData', e); return null; }
}
function setData(node, d) { node.setPluginData(TAG, JSON.stringify(d)); }
function isTable(node) { return node && node.type === 'FRAME' && node.getPluginData(TAG) ? true : false; }

// ═══ Generate Table ═══

function generateTable(rows, cols, hasHeader, widths, heights, styles, cellData, colTypes, headerBold, colProps, colAlign, rowAlign, wrap) {
  const totalW = widths ? widths.reduce((a, b) => a + b, 0) : cols * 100;
  const totalH = heights ? heights.reduce((a, b) => a + b, 0) : rows * 36;
  const table = figma.createFrame();
  table.name = 'CoyTable';
  table.layoutMode = 'VERTICAL';
  table.primaryAxisSizingMode = 'FIXED';
  table.counterAxisSizingMode = 'FIXED';
  table.resize(totalW, totalH);
  table.itemSpacing = 0;
  table.paddingLeft = 0; table.paddingRight = 0; table.paddingTop = 0; table.paddingBottom = 0;
  table.fills = [fill(styles.bodyBg || '#FFFFFF')];
  table.strokeWeight = styles.borderWidth != null ? styles.borderWidth : 1;
  table.strokes = [fill(styles.outerBorderColor || styles.borderColor || '#D4D4D8')];
  table.cornerRadius = styles.cornerRadius || 4;
  table.clipsContent = true;
  const innerW = styles.innerBorderWidth || 1;
  const pl = styles.cellPaddingL || 8, pr = styles.cellPaddingR || 8;
  const pt = styles.cellPaddingT || 4, pb = styles.cellPaddingB || 4;

  // When wrap is ON, rows/cells/table auto-expand height to fit wrapped text
  if (wrap) {
    table.primaryAxisSizingMode = 'AUTO';
    table.resize(totalW, 0);
  }

  for (let r = 0; r < rows; r++) {
    const isH = hasHeader && r === 0;
    const hgt = heights[r] || 36;
    const row = figma.createFrame();
    row.resize(totalW, wrap ? 0 : hgt);
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = wrap ? 'AUTO' : 'FIXED';
    row.counterAxisSizingMode = 'FIXED';
    row.itemSpacing = 0;
    row.fills = [];
    row.name = isH ? 'Header' : `Row ${r}`;
    row.strokeWeight = 0;

    for (let c = 0; c < cols; c++) {
      const bg = isH ? (styles.headerBg || '#F4F4F5') : (styles.bodyBg || '#FFFFFF');
      const tc = isH ? (styles.headerText || '#18181B') : (styles.bodyText || '#18181B');
      const w = (widths && widths[c]) || 100;
      const ct = (colTypes && colTypes[c]) || 'text';
      const val = (cellData && cellData[r] && cellData[r][c] !== undefined) ? cellData[r][c] : (isH ? `Col ${c+1}` : '');

      const cell = figma.createFrame();
      cell.resize(w, wrap ? 0 : hgt);
      cell.layoutMode = 'HORIZONTAL';
      cell.primaryAxisSizingMode = 'FIXED';
      cell.counterAxisSizingMode = wrap ? 'AUTO' : 'FIXED';
      cell.fills = [fill(bg)];
      cell.name = isH ? `Header Cell ${c}` : `Cell ${c}`;
      cell.strokeAlign = 'INSIDE';
      cell.clipsContent = true;
      cell.paddingLeft = pl; cell.paddingRight = pr;
      cell.paddingTop = pt; cell.paddingBottom = pb;
      // Alignment: colAlign (horizontal) + rowAlign (vertical)
      const ha = (colAlign && colAlign[c]) || styles.textAlign || 'left';
      cell.primaryAxisAlignItems = ha === 'left' ? 'MIN' : ha === 'right' ? 'MAX' : 'CENTER';
      const va = (rowAlign && rowAlign[r]) || 'middle';
      cell.counterAxisAlignItems = va === 'top' ? 'MIN' : va === 'bottom' ? 'MAX' : 'CENTER';
      // Cell borders: right edge (except last col) + bottom edge (except last row)
      cell.strokes = [{ type: 'SOLID', color: hexToRgb(styles.borderColor || '#E4E4E7') }];
      cell.strokeWeight = innerW;
      cell.strokeTopWeight = 0; cell.strokeLeftWeight = 0;
      cell.strokeRightWeight = c < cols - 1 ? innerW : 0;
      cell.strokeBottomWeight = r < rows - 1 ? innerW : 0;

      // Text horizontal alignment
      const textAlignMap = { left: 'LEFT', center: 'CENTER', right: 'RIGHT' };
      const textHAlign = textAlignMap[ha] || 'LEFT';

      // ── Cell content ──
      if (isH) { createHeaderCellContent(cell, val, c, headerBold, styles, tc, textHAlign, w, pl, pr, wrap); }
      else { createBodyCellContent(cell, ct, val, r, c, hasHeader, colProps, styles, tc, textHAlign, w, pl, pr, wrap); }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  // Zebra striping
  if (styles.altRowBg && styles.altRowBg !== styles.bodyBg) {
    for (let r = hasHeader ? 1 : 0; r < rows; r++) {
      if ((r - (hasHeader ? 1 : 0)) % 2 === 1) {
        const row = table.children[r];
        if (row) {
          const cells = row.children;
          const alt = fill(styles.altRowBg);
          cells.forEach(c => { if (c) c.fills = [alt]; });
        }
      }
    }
  }

  setData(table, {
    type: 'coytable', version: '2.0.0',
    rows, cols, hasHeader, headerBold,
    colTypes: colTypes || [],
    colAlign: colAlign || [],
    rowAlign: rowAlign || [],
    columnWidths: widths || [],
    colProps: colProps || [],
    styles: sanitize(styles)
  });
  return table;
}

// ═══ Cell Content Helpers ═══

function createHeaderCellContent(cell, val, c, headerBold, styles, tc, textHAlign, w, pl, pr, wrap) {
  const hdrVal = String(val !== undefined && val !== '' ? val : `Col ${c+1}`);
  const t = figma.createText();
  try { t.characters = hdrVal; } catch(e) { _logWarn('header characters', e); }
  try { t.fontName = { family: 'Inter', style: headerBold ? 'Semi Bold' : 'Regular' }; } catch(e) { _logWarn('header fontName', e); }
  try { t.fontSize = styles.fontSize || 12; } catch(e) { _logWarn('header fontSize', e); }
  try { t.fills = [fill(tc)]; } catch(e) { _logWarn('header fills', e); }
  try { t.textAlignHorizontal = textHAlign; } catch(e) { _logWarn('header textAlign', e); }
  if (wrap) { try { t.textAutoResize = 'HEIGHT'; t.resize(w - pl - pr, 0); } catch(e) { _logWarn('header wrap', e); } }
  else { try { t.textAutoResize = 'NONE'; t.resize(w - pl - pr, Math.round((styles.fontSize||12)*1.35)); t.textTruncation = 'ENDING'; } catch(e) { _logWarn('header truncate', e); } }
  cell.appendChild(t);
}

function createBodyCellContent(cell, ct, val, r, c, hasHeader, colProps, styles, tc, textHAlign, w, pl, pr, wrap) {
  switch (ct) {
    case 'radio': createRadioCell(cell, val, textHAlign); break;
    case 'checkbox': createCheckboxCell(cell, val, textHAlign); break;
    case 'index': createIndexCell(cell, r, hasHeader, styles, textHAlign); break;
    case 'image': createImageCell(cell); break;
    case 'progress': createProgressCell(cell, val, textHAlign); break;
    case 'tag': createTagCell(cell, val, textHAlign); break;
    case 'action': createActionCell(cell, colProps, c, textHAlign); break;
    default: createDefaultTextCell(cell, val, styles, tc, textHAlign, w, pl, pr, wrap);
  }
}

function createRadioCell(cell, val, textHAlign) {
  const s = 14;
  const dot = figma.createEllipse();
  dot.resize(s, s);
  dot.strokes = [{ type: 'SOLID', color: hexToRgb('#007ffc') }];
  dot.strokeWeight = 2; dot.fills = [];
  cell.appendChild(dot);
  if (String(val) === '1') {
    const inner = figma.createEllipse();
    inner.resize(s * 0.55, s * 0.55);
    inner.fills = [{ type: 'SOLID', color: hexToRgb('#007ffc') }];
    cell.appendChild(inner);
  }
}

function createCheckboxCell(cell, val, textHAlign) {
  const s = 14;
  const box = figma.createRectangle();
  box.resize(s, s);
  box.cornerRadius = 3;
  if (String(val) === '1') {
    box.fills = [{ type: 'SOLID', color: hexToRgb('#007ffc') }];
  } else {
    box.strokes = [{ type: 'SOLID', color: hexToRgb('#D4D4D8') }];
    box.strokeWeight = 2; box.fills = [];
  }
  cell.appendChild(box);
  if (String(val) === '1') {
    const chk = figma.createText();
    try { chk.characters = '✓'; } catch(e) { _logWarn('chk char', e); }
    try { chk.fontSize = 10; } catch(e) { _logWarn('chk fontSize', e); }
    try { chk.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }]; } catch(e) { _logWarn('chk fills', e); }
    try { chk.textAlignHorizontal = textHAlign; } catch(e) { _logWarn('chk align', e); }
    cell.appendChild(chk);
  }
}

function createIndexCell(cell, r, hasHeader, styles, textHAlign) {
  const t = figma.createText();
  try { t.characters = String(r + 1 - (hasHeader ? 1 : 0)); } catch(e) { _logWarn('idx char', e); }
  try { t.fontSize = styles.fontSize || 12; } catch(e) { _logWarn('idx fontSize', e); }
  try { t.fills = [{ type: 'SOLID', color: hexToRgb('#A1A1AA') }]; } catch(e) { _logWarn('idx fills', e); }
  try { t.textAlignHorizontal = textHAlign; } catch(e) { _logWarn('idx align', e); }
  cell.appendChild(t);
}

function createImageCell(cell) {
  const img = figma.createRectangle();
  img.resize(30, 30);
  img.cornerRadius = 6;
  img.fills = [{ type: 'SOLID', color: hexToRgb('#E4E4E7') }];
  cell.appendChild(img);
}

function createProgressCell(cell, val, textHAlign) {
  const pct = Math.min(100, Math.max(0, parseInt(val) || 0));
  const barW = 60, barH = 8;
  const track = figma.createFrame();
  track.resize(barW, barH);
  track.cornerRadius = 4;
  track.fills = [{ type: 'SOLID', color: hexToRgb('#E4E4E7') }];
  track.clipsContent = true;
  const fillW = Math.max(4, barW * pct / 100);
  const fill = figma.createRectangle();
  fill.resize(fillW, barH);
  fill.x = 0; fill.y = 0;
  fill.cornerRadius = 4;
  fill.fills = [{ type: 'SOLID', color: hexToRgb('#007ffc') }];
  track.appendChild(fill);
  const lb = figma.createText();
  try { lb.characters = pct + '%'; } catch(e) { _logWarn('prog char', e); }
  try { lb.fontSize = 10; } catch(e) { _logWarn('prog fontSize', e); }
  try { lb.fills = [{ type: 'SOLID', color: hexToRgb('#A1A1AA') }]; } catch(e) { _logWarn('prog fills', e); }
  try { lb.textAlignHorizontal = textHAlign; } catch(e) { _logWarn('prog align', e); }
  const sub = figma.createFrame();
  sub.layoutMode = 'HORIZONTAL';
  sub.primaryAxisSizingMode = 'AUTO';
  sub.counterAxisSizingMode = 'AUTO';
  sub.counterAxisAlignItems = 'CENTER';
  sub.itemSpacing = 4;
  sub.fills = [];
  sub.appendChild(track);
  sub.appendChild(lb);
  cell.appendChild(sub);
}

function createTagCell(cell, val, textHAlign) {
  const a = (val || '标签').split('|');
  const label = a[0] || '标签';
  const tagColor = a[1] || '#007ffc';
  const style = a[2] || 'ghost';
  const filled = style === 'filled';
  const dot = figma.createEllipse();
  dot.resize(5, 5);
  dot.fills = [{ type: 'SOLID', color: filled ? hexToRgb('#FFFFFF') : hexToRgb(tagColor) }];
  if (filled) dot.opacity = 0.7;
  const txt = figma.createText();
  try { txt.characters = ' ' + label; } catch(e) { _logWarn('tag char', e); }
  try { txt.fontSize = 11; } catch(e) { _logWarn('tag fontSize', e); }
  try { txt.fontName = { family: 'Inter', style: 'Medium' }; } catch(e) { _logWarn('tag fontName', e); }
  try { txt.fills = [fill(filled ? '#FFFFFF' : tagColor)]; } catch(e) { _logWarn('tag fills', e); }
  try { txt.textAlignHorizontal = textHAlign; } catch(e) { _logWarn('tag align', e); }
  const tagF = figma.createFrame();
  tagF.layoutMode = 'HORIZONTAL';
  tagF.primaryAxisSizingMode = 'AUTO';
  tagF.counterAxisSizingMode = 'AUTO';
  tagF.counterAxisAlignItems = 'CENTER';
  tagF.cornerRadius = 5; tagF.strokeWeight = 1;
  tagF.paddingLeft = 10; tagF.paddingRight = 12;
  tagF.paddingTop = 2; tagF.paddingBottom = 2;
  if (filled) {
    tagF.fills = [{ type: 'SOLID', color: hexToRgb(tagColor) }];
    tagF.strokes = [{ type: 'SOLID', color: hexToRgb(tagColor) }];
  } else {
    tagF.fills = [{ type: 'SOLID', color: hexToRgb(tagColor), opacity: 0.1 }];
    tagF.strokes = [{ type: 'SOLID', color: hexToRgb(tagColor), opacity: 0.25 }];
  }
  tagF.appendChild(dot); tagF.appendChild(txt);
  cell.appendChild(tagF);
}

function createActionCell(cell, colProps, c, textHAlign) {
  cell.itemSpacing = 8;
  const n = parseInt(colProps && colProps[c] && colProps[c].actionCount) || 2;
  for (let i = 0; i < n; i++) {
    const lb = (colProps && colProps[c] && colProps[c].actionLabels && colProps[c].actionLabels[i]) || (i === 0 ? '编辑' : i === 1 ? '删除' : '更多');
    const txt = figma.createText();
    try { txt.characters = lb; } catch(e) { _logWarn('act char', e); }
    try { txt.fontSize = 11; } catch(e) { _logWarn('act fontSize', e); }
    try { txt.fontName = { family: 'Inter', style: 'Medium' }; } catch(e) { _logWarn('act fontName', e); }
    try { txt.fills = [{ type: 'SOLID', color: hexToRgb('#A1A1AA') }]; } catch(e) { _logWarn('act fills', e); }
    try { txt.textAlignHorizontal = textHAlign; } catch(e) { _logWarn('act align', e); }
    const bf = figma.createFrame();
    bf.resize(46, 21);
    bf.layoutMode = 'HORIZONTAL';
    bf.primaryAxisSizingMode = 'FIXED';
    bf.counterAxisSizingMode = 'FIXED';
    bf.counterAxisAlignItems = 'CENTER';
    bf.primaryAxisAlignItems = 'CENTER';
    bf.cornerRadius = 4;
    bf.fills = [{ type: 'SOLID', color: hexToRgb('#F4F4F5') }];
    bf.strokes = [{ type: 'SOLID', color: hexToRgb('#E4E4E7') }];
    bf.strokeWeight = 1;
    bf.paddingLeft = 8; bf.paddingRight = 8;
    bf.paddingTop = 0; bf.paddingBottom = 0;
    bf.itemSpacing = 4;
    bf.appendChild(txt);
    cell.appendChild(bf);
  }
}

function createDefaultTextCell(cell, val, styles, tc, textHAlign, w, pl, pr, wrap) {
  const t = figma.createText();
  try { t.characters = String(val || ''); } catch(e) { _logWarn('def char', e); }
  try { t.fontName = { family: 'Inter', style: 'Regular' }; } catch(e) { _logWarn('def fontName', e); }
  try { t.fontSize = styles.fontSize || 12; } catch(e) { _logWarn('def fontSize', e); }
  try { t.fills = [fill(tc)]; } catch(e) { _logWarn('def fills', e); }
  try { t.textAlignHorizontal = textHAlign; } catch(e) { _logWarn('def align', e); }
  if (wrap) { try { t.textAutoResize = 'HEIGHT'; t.resize(w - pl - pr, 0); } catch(e) { _logWarn('def wrap', e); } }
  else { try { t.textAutoResize = 'NONE'; t.resize(w - pl - pr, Math.round((styles.fontSize||12)*1.35)); t.textTruncation = 'ENDING'; } catch(e) { _logWarn('def truncate', e); } }
  cell.appendChild(t);
}

function sanitize(s) {
  const keys = ['headerBg','bodyBg','borderColor','outerBorderColor','headerText','bodyText','altRowBg','cellPaddingL','cellPaddingR','cellPaddingT','cellPaddingB','fontSize','cornerRadius','textAlign','borderWidth','innerBorderWidth'];
  const o = {};
  keys.forEach(k => { if (s[k] !== undefined) o[k] = s[k]; });
  return o;
}

// ═══ Apply Style to Existing Table ═══

function applyStyleToTable(table, styles) {
  const data = getData(table);
  if (!data) return;
  const rows = table.children;
  const hasHeader = data.hasHeader;

  // Outer frame
  table.strokeWeight = styles.borderWidth != null ? styles.borderWidth : 1;
  table.strokes = [fill(styles.outerBorderColor || styles.borderColor || '#D4D4D8')];
  table.cornerRadius = styles.cornerRadius || 4;
  table.clipsContent = true;

  for (let r = 0; r < rows.length; r++) {
    const isH = hasHeader && r === 0;
    const cells = rows[r].children;
    for (let c = 0; c < cells.length; c++) {
      const cell = cells[c];
      const bg = isH ? (styles.headerBg || '#F4F4F5') : (styles.bodyBg || '#FFFFFF');
      const tc = isH ? (styles.headerText || '#18181B') : (styles.bodyText || '#18181B');
      cell.fills = [fill(bg)];
      cell.paddingLeft = styles.cellPaddingL || 8;
      cell.paddingRight = styles.cellPaddingR || 8;
      cell.paddingTop = styles.cellPaddingT || 4;
      cell.paddingBottom = styles.cellPaddingB || 4;
      cell.primaryAxisAlignItems = { left: 'MIN', center: 'CENTER', right: 'MAX' }[styles.textAlign || 'left'] || 'MIN';

      // Borders
      const s = [];
      if (c < cells.length - 1) s.push(fill(styles.borderColor || '#E4E4E7'));
      if (r < rows.length - 1) s.push(fill(styles.borderColor || '#E4E4E7'));
      cell.strokes = s;

      const text = cell.findChild(n => n.type === 'TEXT');
      if (text) {
        text.fills = [fill(tc)];
        text.fontSize = styles.fontSize || 12;
        text.fontName = { family: 'Inter', style: isH ? 'Semi Bold' : 'Regular' };
      }
    }
  }

  // Zebra striping
  if (styles.altRowBg && styles.altRowBg !== styles.bodyBg) {
    for (let r = hasHeader ? 1 : 0; r < rows.length; r++) {
      if ((r - (hasHeader ? 1 : 0)) % 2 === 1) {
        const cells = rows[r].children;
        const alt = fill(styles.altRowBg);
        cells.forEach(c => { c.fills = [alt]; });
      }
    }
  }

  // Update stored data
  data.styles = sanitize(styles);
  setData(table, data);
}

// ═══ Cell Batch Style ═══

function applyCellStyle(cells, style) {
  // style: { fill?: string, textColor?: string, border?: string, borderWeight?: number }
  if (!Array.isArray(cells)) return;
  for (const cell of cells) {
    if (style.fill) cell.fills = [fill(style.fill)];
    if (style.border) cell.strokes = [fill(style.border)];
    if (style.borderWeight != null) cell.strokeWeight = style.borderWeight;
    const text = cell.findChild(n => n.type === 'TEXT');
    if (text && style.textColor) text.fills = [fill(style.textColor)];
  }
}

// ═══ Merge Cells ═══

function mergeCells(row, startCol, endCol) {
  const cells = row.children;
  if (startCol < 0 || endCol >= cells.length || startCol >= endCol) return;
  const main = cells[startCol];
  for (let c = startCol + 1; c <= endCol; c++) {
    cells[c].visible = false;
  }
  main.layoutGrow = 1;
}

function splitCells(row, startCol, endCol) {
  const cells = row.children;
  for (let c = startCol; c <= endCol; c++) {
    if (cells[c]) {
      cells[c].visible = true;
      cells[c].layoutGrow = 0;
    }
  }
}

// ═══ Extract cell data from table node ═══

function extractCellData(table, cols) {
  const rows = table.children;
  const data = [];
  for (let r = 0; r < rows.length; r++) {
    const cells = rows[r].children;
    const rowData = [];
    for (let c = 0; c < cols && c < cells.length; c++) {
      const cell = cells[c];
      if (!cell) { rowData.push(''); continue; }
      const texts = cell.findAll(n => n.type === 'TEXT');
      // Collect all non-empty texts separated by space
      const parts = [];
      for (const t of texts) {
        const ch = t.characters.trim();
        if (ch && !parts.includes(ch)) parts.push(ch);
      }
      rowData.push(parts.join(' '));
    }
    data.push(rowData);
  }
  return data;
}

// ═══ Message Router ═══

figma.showUI(__html__, { width: 880, height: 680, title: 'CoyTable' });

figma.on('selectionchange', () => {
  const sel = figma.currentPage.selection;
  for (const node of sel) {
    if (isTable(node)) {
      const data = getData(node);
      if (data) {
        figma.ui.postMessage({ type: 'table-available', tableId: node.id, tableName: node.name });
        return;
      }
    }
  }
  figma.ui.postMessage({ type: 'no-table-selected' });
});

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {

    case 'generate-table': {
      try {
        // Load fonts before creating text nodes
        const FONT_STACK = [
          { family: 'Inter', style: 'Regular' },
          { family: 'Inter', style: 'Semi Bold' },
          { family: 'Noto Sans SC', style: 'Regular' },
          { family: 'Noto Sans SC', style: 'Bold' },
          { family: 'PingFang SC', style: 'Regular' },
          { family: 'PingFang SC', style: 'Medium' },
          { family: 'Microsoft YaHei', style: 'Regular' },
          { family: 'Microsoft YaHei', style: 'Bold' },
          { family: 'SF Pro Text', style: 'Regular' },
          { family: 'SF Pro Display', style: 'Regular' },
          { family: 'Arial', style: 'Regular' },
          { family: 'Arial', style: 'Bold' },
          { family: 'sans-serif', style: 'Regular' }
        ];
        const loadedFonts = [];
        for (const f of FONT_STACK) {
          try { await figma.loadFontAsync(f); loadedFonts.push(f.family); } catch(e) { /* skip */ }
        }
        if (loadedFonts.length === 0) _logWarn('No fonts could be loaded', new Error('all font loads failed'));
        const table = generateTable(msg.rows, msg.cols, msg.hasHeader, msg.widths, msg.heights, msg.styles, msg.cellData, msg.colTypes, msg.headerBold, msg.colProps, msg.colAlign, msg.rowAlign, msg.wrap);
        if (msg.insertInto) {
          const parent = figma.getNodeById(msg.insertInto);
          if (parent && parent.type === 'FRAME') {
            parent.appendChild(table);
            table.x = 0; table.y = 0;
          }
        } else {
          figma.currentPage.appendChild(table);
        }
        // Center on viewport
        const vp = figma.viewport;
        table.x = vp.center.x - table.width / 2;
        table.y = vp.center.y - table.height / 2;
        figma.currentPage.selection = [table];
        figma.viewport.scrollAndZoomIntoView([table]);
        figma.ui.postMessage({ type: 'success', message: `✓ 已生成 ${msg.rows}×${msg.cols} 表格` });
      } catch (e) {
        figma.ui.postMessage({ type: 'error', message: e.message });
      }
      break;
    }

    case 'apply-style': {
      // msg: { tableId, styles }
      try {
        const fontRegular = { family: 'Inter', style: 'Regular' };
        try { await figma.loadFontAsync(fontRegular); } catch(e) { _logWarn('loadFont in apply-style', e); }
      } catch(e) {}
      const node = figma.getNodeById(msg.tableId);
      if (node && isTable(node)) {
        applyStyleToTable(node, msg.styles);
        figma.ui.postMessage({ type: 'success', message: '✓ 样式已更新' });
      } else {
        figma.ui.postMessage({ type: 'error', message: '未找到表格或已被删除' });
      }
      break;
    }

    case 'cell-style': {
      // msg: { tableId, row, col, style }
      const n = figma.getNodeById(msg.tableId);
      if (n && n.type === 'FRAME') {
        const row = n.children[msg.row];
        if (row) {
          const cell = row.children[msg.col];
          if (cell) applyCellStyle([cell], msg.style);
        }
        figma.ui.postMessage({ type: 'success', message: '✓ 单元格样式已更新' });
      }
      break;
    }

    case 'merge-cells': {
      // msg: { tableId, rowIndex, startCol, endCol }
      const tn = figma.getNodeById(msg.tableId);
      if (tn && tn.type === 'FRAME') {
        const row = tn.children[msg.rowIndex];
        if (row) mergeCells(row, msg.startCol, msg.endCol);
      }
      break;
    }

    case 'split-cells': {
      const tn2 = figma.getNodeById(msg.tableId);
      if (tn2 && tn2.type === 'FRAME') {
        const row = tn2.children[msg.rowIndex];
        if (row) splitCells(row, msg.startCol, msg.endCol);
      }
      break;
    }

    case 'request-selected-table': {
      const sel = figma.currentPage.selection;
      for (const node of sel) {
        if (isTable(node)) {
          const data = getData(node);
          if (data) {
            data.cellData = extractCellData(node, data.cols || 1);
            figma.ui.postMessage({ type: 'table-detected', tableId: node.id, tableName: node.name, model: data });
            return;
          }
        }
      }
      figma.ui.postMessage({ type: 'no-table-selected' });
      break;
    }

    case 'resize-window': {
      figma.ui.resize(msg.width, msg.height);
      break;
    }

    default:
      break;
  }
};
