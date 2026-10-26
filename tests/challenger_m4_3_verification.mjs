import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('--- STARTING CHALLENGER_M4_3 INDEPENDENT VERIFICATION ---');

// 1. Audit all <a> tags with target="_blank"
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js') || entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
}
walk(path.join(ROOT_DIR, 'src'));

let insecureCount = 0;
let totalBlankCount = 0;
const auditedFiles = new Set();

for (const f of files) {
  const code = fs.readFileSync(f, 'utf-8');
  // Match complete <a ...> tags across multiple lines
  const aMatches = code.match(/<a\b[\s\S]*?>/gi) || [];
  for (const a of aMatches) {
    if (/target\s*=\s*["']_blank["']/i.test(a)) {
      totalBlankCount++;
      auditedFiles.add(path.relative(ROOT_DIR, f));
      const hasRel = /rel\s*=\s*["']noopener\s+noreferrer["']/i.test(a);
      if (!hasRel) {
        console.error('❌ Insecure link found in:', path.relative(ROOT_DIR, f), a);
        insecureCount++;
      }
    }
  }
}

console.log(`✅ Total external target="_blank" links audited: ${totalBlankCount}`);
console.log(`✅ Files containing external target="_blank" links: ${auditedFiles.size}`);
for (const f of auditedFiles) {
  console.log(`   - ${f}`);
}
console.log(`✅ Insecure external links count: ${insecureCount}`);

if (insecureCount > 0) {
  console.error('FAIL: Found insecure external links without rel="noopener noreferrer"');
  process.exit(1);
}

// 2. Validate email regex extracted from ContactForm.jsx
const contactFormPath = path.join(ROOT_DIR, 'src/components/sections/contact/ContactForm.jsx');
const contactForm = fs.readFileSync(contactFormPath, 'utf-8');
const match = contactForm.match(/const\s+isValidEmail\s*=\s*\([^)]*\)\s*=>\s*(\/[^\/]+\/[a-z]*)\.test/);
if (!match) {
  console.error('❌ Could not locate isValidEmail regex in ContactForm.jsx');
  process.exit(1);
}

// Instantiate regex from matched literal
const regexParts = match[1].match(/^\/(.*)\/([a-z]*)$/);
const emailRegex = new RegExp(regexParts[1], regexParts[2]);
console.log(`✅ Extracted email regex from ContactForm.jsx: ${emailRegex}`);

const validCases = [
  'aadinathbmagar75@gmail.com',
  'a@b.cd',
  'user.name+tag@sub.domain.org',
  'test_123-abc@domain.co.in',
  'engineer@antigravity.dev'
];

for (const v of validCases) {
  const result = emailRegex.test(v);
  if (!result) {
    console.error(`❌ Unexpectedly rejected valid email: ${v}`);
    process.exit(1);
  }
}
console.log(`✅ All ${validCases.length} valid email test cases accepted.`);

const invalidCases = [
  '',
  '   ',
  'plainaddress',
  '#@%^%#$@#$@#.com',
  '@example.com',
  'Joe Smith <email@example.com>',
  'email.example.com',
  'email@example@example.com',
  'email@example.com (Joe Smith)',
  'email@example',
  'email@111.222.333.44444',
  'user@.com',
  'user name@domain.com',
  '<script>alert(1)</script>@domain.com',
  'user@domain,com',
  'user@domain.com; DROP TABLE users;'
];

for (const inv of invalidCases) {
  const result = emailRegex.test(inv);
  if (result) {
    console.error(`❌ Unexpectedly accepted invalid email: ${inv}`);
    process.exit(1);
  }
}
console.log(`✅ All ${invalidCases.length} invalid email test cases rejected.`);

console.log('--- ALL CHALLENGER_M4_3 INDEPENDENT ADVERSARIAL CHECKS PASSED EMPIRICALLY ---');
