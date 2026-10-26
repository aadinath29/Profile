const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../../');
const targets = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'tailwind.config.js')
];

const keywords = ['cyan', 'neon', 'blue', 'gold', 'glow', '#00f0ff', '#fbbf24', '#07090e', '#0e131f', '#0284c7', '#d97706'];

function getAllFiles(dir, exts = ['.js', '.jsx', '.css', '.html']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else {
      const ext = path.extname(fullPath);
      if (exts.includes(ext)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

let files = [];
for (const t of targets) {
  if (fs.existsSync(t)) {
    if (fs.statSync(t).isDirectory()) {
      files = files.concat(getAllFiles(t));
    } else {
      files.push(t);
    }
  }
}

const report = {
  byKeyword: {},
  byFile: {},
  summary: {}
};

keywords.forEach(kw => {
  report.byKeyword[kw] = [];
});

files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    keywords.forEach(kw => {
      if (line.toLowerCase().includes(kw.toLowerCase())) {
        const item = {
          file: relPath,
          line: lineNum,
          content: line.trim()
        };
        report.byKeyword[kw].push(item);
        if (!report.byFile[relPath]) {
          report.byFile[relPath] = [];
        }
        report.byFile[relPath].push({
          keyword: kw,
          line: lineNum,
          content: line.trim()
        });
      }
    });
  });
});

for (const kw of keywords) {
  report.summary[kw] = report.byKeyword[kw].length;
}

fs.writeFileSync(
  path.join(__dirname, 'token_survey_results.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

let summaryText = '=== CODEBASE TOKEN SURVEY SUMMARY ===\n\n';
summaryText += 'Total occurrences by keyword:\n';
for (const [kw, count] of Object.entries(report.summary)) {
  summaryText += `  ${kw.padEnd(15)}: ${count}\n`;
}
summaryText += '\nFiles containing legacy color / glow tokens:\n';
for (const [file, items] of Object.entries(report.byFile)) {
  summaryText += `\n--- ${file} (${items.length} occurrences) ---\n`;
  items.forEach(it => {
    summaryText += `  L${it.line} [${it.keyword}]: ${it.content}\n`;
  });
}

fs.writeFileSync(path.join(__dirname, 'token_survey_summary.txt'), summaryText, 'utf8');
console.log('Survey scan complete! Files processed:', files.length);
