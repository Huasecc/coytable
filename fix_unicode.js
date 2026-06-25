const fs = require('fs');
let c = fs.readFileSync('e:/Html/CoyTable/ui.html', 'utf8');
const count_before = c.split('\uFFFD').length - 1;
console.log('Before: ' + count_before + ' U+FFFD chars');

// Strategy: Use buffer-level approach to replace specific byte sequences
const buf = fs.readFileSync('e:/Html/CoyTable/ui.html');
const ff = Buffer.from([0xEF, 0xBF, 0xBD]); // U+FFFD
const qm = Buffer.from([0x3F]); // question mark '?'

// Build replacements: each entry is [byte_pattern_to_find, replacement_string]
// We find the pattern in the buffer, but replace with UTF-8 string
const replacements = [];

// Function: find and replace in buffer
function findPatternInBuffer(hexPattern) {
  const pat = Buffer.from(hexPattern, 'hex');
  let idx = 0;
  const found = [];
  while ((idx = buf.indexOf(pat, idx)) >= 0) {
    found.push(idx);
    idx++;
  }
  return found;
}

// Check all U+FFFD occurrences and their surrounding bytes
let idx = 0;
const occurrences = [];
while ((idx = buf.indexOf(ff, idx)) >= 0) {
  const ctx_start = Math.max(0, idx - 30);
  const ctx_end = Math.min(buf.length, idx + 10);
  const ctx_hex = buf.slice(ctx_start, ctx_end).toString('hex');
  const ctx_text = buf.slice(ctx_start, ctx_end).toString('utf8').replace(/\n/g, '\\n');
  const has_q = (idx + 3 < buf.length && buf[idx + 3] === 0x3F);
  occurrences.push({ offset: idx, hex: ctx_hex, text: ctx_text, has_q: has_q, next_byte: buf[idx + 3] });
  idx = idx + 3;
}

// Now let's fix each occurrence based on context
// Process from end to start so offsets don't shift
occurrences.reverse();

let buf_arr = Buffer.from(buf); // copy
let total_fixed = 0;

for (const occ of occurrences) {
  const offset = occ.offset;
  const next3 = occ.has_q ? 4 : 3;
  const ctx_before = buf_arr.slice(Math.max(0, offset - 40), offset).toString('utf8');
  
  let replacement = '';
  
  // Determine what to replace based on context
  if (ctx_before.includes('justify-content:center">')) {
    replacement = '日';
  } else if (ctx_before.includes('生成到画')) {
    replacement = '布';
  } else if (ctx_before.endsWith('内边') || ctx_before.endsWith('外边')) {
    replacement = '距';
  } else if (ctx_before.endsWith('文字')) {
    replacement = '颜色';
  } else if (ctx_before.endsWith('内间')) {
    replacement = '距';
  } else if (ctx_before.endsWith('单元格样')) {
    replacement = '式';
  } else if (ctx_before.endsWith('斑马') || ctx_before.endsWith('启用斑马')) {
    replacement = '纹';
  } else if (ctx_before.endsWith('交替')) {
    replacement = '色';
  } else if (ctx_before.endsWith('已重')) {
    replacement = '置';
  } else if (ctx_before.includes('class="arrow">')) {
    replacement = '›';
  } else if (ctx_before.endsWith('`') && (buf_arr[offset + 3] === 0x7B || occ.next_byte === 0x7B)) {
    // backtick: `�{c+1} or `�{cc+1}
    replacement = '列';
  } else if (buf_arr[offset + next3] === 0x3C && ctx_before.endsWith('">')) {
    // drag handle: >�</span>
    replacement = '⠿';
  } else if (ctx_before.endsWith("'✓'')") || ctx_before.includes("'1'?'")) {
    // checkbox: �'') 
    replacement = '✓';
  } else if (ctx_before.includes('// ══') && ctx_before.includes('Toast')) {
    replacement = '═ Toast ═';
  } else if (ctx_before.includes('// ══') && ctx_before.includes('Popups')) {
    replacement = '═ Popups ═';
  } else if (ctx_before.includes('// ══') && ctx_before.includes('Drag & Drop')) {
    replacement = '═ Drag & Drop Reorder ═';
  } else if (ctx_before.includes('// ══') && ctx_before.includes('Controls')) {
    replacement = '═ Controls ═';
  } else if (ctx_before.includes('title="单')) {
    replacement = '选"';
  } else if (ctx_before.includes('title="复')) {
    replacement = '选"';
  } else if (ctx_before.endsWith("开") && !ctx_before.includes("开启")) {
    replacement = '启';
  } else if (ctx_before.endsWith("'t:'")) {
    replacement = '上';
  } else if (ctx_before.endsWith("'b:'")) {
    replacement = '下';
  } else if (ctx_before.endsWith("'l:'")) {
    replacement = '左';
  } else if (ctx_before.endsWith("'r:'")) {
    replacement = '右';
  } else if (ctx_before.endsWith("左对")) {
    replacement = '齐';
  } else if (ctx_before.endsWith("右对")) {
    replacement = '齐';
  } else if (ctx_before.includes("'复制") && !ctx_before.includes("复制列") && !ctx_before.includes("复制行")) {
    replacement = '列';
  } else if (ctx_before.includes("'删除") && !ctx_before.includes("删除列") && !ctx_before.includes("删除行")) {
    replacement = '列';
  } else if (ctx_before.endsWith("'鼠标")) {
    replacement = '垫';
  } else if (ctx_before.endsWith("'显示")) {
    replacement = '器';
  } else if (ctx_before.endsWith("'项目首付")) {
    replacement = '款';
  } else if (ctx_before.endsWith("'服务器采")) {
    replacement = '购';
  } else if (ctx_before.endsWith("'产品评审")) {
    replacement = '会';
  } else if (ctx_before.endsWith("'周进度同")) {
    replacement = '步会';
  } else if (ctx_before.endsWith("'技术方案讨")) {
    replacement = '论会';
  } else if (ctx_before.endsWith("'季度复盘")) {
    replacement = '会';
  } else if (ctx_before.endsWith("'用户反馈")) {
    replacement = '会';
  } else if (ctx_before.endsWith("'部门负责")) {
    replacement = '人';
  } else if (ctx_before.endsWith("'赵主")) {
    replacement = '管';
  } else if (ctx_before.endsWith("'李经")) {
    replacement = '理';
  } else if (ctx_before.endsWith("'产品、设")) {
    replacement = '计';
  } else if (ctx_before.endsWith("'innerBorder':'内边")) {
    replacement = '距';
  } else if (ctx_before.endsWith("'outerBorder':'外边")) {
    replacement = '距';
  } else if (ctx_before.endsWith("'textColor':'文字")) {
    replacement = '颜色';
  } else if (ctx_before.endsWith("'padding':'内间")) {
    replacement = '距';
  } else if (ctx_before.endsWith("'zebra':'启用斑马")) {
    replacement = '纹';
  } else if (ctx_before.endsWith("'on':'开")) {
    replacement = '启';
  } else if (ctx_before.endsWith("'altColor':'交替")) {
    replacement = '色';
  } else if (ctx_before.endsWith("'开")) {
    replacement = '启';
  } else if (ctx_before.includes("actionLabels:['") && ctx_before.includes("'")) {
    // action labels: ['查','改','删']
    // We need to handle the 3 chars together
    replacement = '查';
  } else {
    console.log('UNKNOWN context: offset=' + offset + ' hex=' + occ.hex.substring(0,80));
    continue;
  }
  
  // Replace in buffer at the U+FFFD position
  const replace_bytes = Buffer.from(replacement, 'utf8');
  const end = occ.has_q ? offset + 4 : offset + 3;
  buf_arr = Buffer.concat([
    buf_arr.slice(0, offset),
    replace_bytes,
    buf_arr.slice(end)
  ]);
  total_fixed++;
}

console.log('Fixed: ' + total_fixed);

// Now also need to handle the actionLabels case specially since it has 3 consecutive U+FFFD
// Check for the pattern ['查','改','删']
let str = buf_arr.toString('utf8');
if (buf_arr.includes(ff)) {
  console.log('WARNING: U+FFFD still present in buffer!');
  // Find remaining
  let rem = str.split('\uFFFD').length - 1;
  console.log('Remaining: ' + rem);
}

// Fix action labels that might have been partially or not fixed
str = str.replace(/actionLabels:\['\uFFFD','\uFFFD','\uFFFD'\]\}/g, "actionLabels:['查','改','删']}");
// Also fix any that may have had '查' already placed for first char
str = str.replace(/actionLabels:\['查','\uFFFD','\uFFFD'\]\}/g, "actionLabels:['查','改','删']}");

// Check remaining
const final_count = str.split('\uFFFD').length - 1;
console.log('Final U+FFFD count: ' + final_count);

if (final_count > 0) {
  const lines = str.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('\uFFFD')) {
      console.log('REMAINING Line ' + (i+1) + ': ' + lines[i].substring(0, 180));
    }
  }
}

fs.writeFileSync('e:/Html/CoyTable/ui.html', str, 'utf8');
console.log('File written.');
