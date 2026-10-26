/**
 * Master CLI Entry Point for E2E Test Suite
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 *
 * Usage:
 *   node tests/e2e/run-all.js [--tier=1|2|3|4] [--grep=pattern] [--bail] [--reporter=console|tap|json] [--timeout=ms]
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { globalRunner, Reporter } from './harness/index.js';

// Parse CLI arguments
const args = process.argv.slice(2);
const options = {
  tier: args.find((a) => a.startsWith('--tier='))?.split('=')[1] || null,
  grep: args.find((a) => a.startsWith('--grep='))?.split('=')[1] || null,
  bail: args.includes('--bail'),
  reporter: args.find((a) => a.startsWith('--reporter='))?.split('=')[1] || 'console',
  timeout: args.find((a) => a.startsWith('--timeout='))?.split('=')[1]
    ? parseInt(args.find((a) => a.startsWith('--timeout=')).split('=')[1], 10)
    : 5000
};

Object.assign(globalRunner.options, options);

async function findTestFiles(dir) {
  const testFiles = [];
  if (!fs.existsSync(dir)) return testFiles;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      testFiles.push(...(await findTestFiles(fullPath)));
    } else if (entry.name.endsWith('.test.js')) {
      testFiles.push(fullPath);
    }
  }
  return testFiles.sort();
}

async function main() {
  const rootE2EDir = path.resolve(process.cwd(), 'tests/e2e');
  const targetTiers = options.tier
    ? [`tier${options.tier}`]
    : ['tier1', 'tier2', 'tier3', 'tier4'];

  console.log(`[E2E] Discovering test suites across: ${targetTiers.join(', ')}...`);

  let totalFiles = 0;
  for (const tierName of targetTiers) {
    const tierDir = path.join(rootE2EDir, tierName);
    const files = await findTestFiles(tierDir);
    totalFiles += files.length;
    for (const file of files) {
      await import(pathToFileURL(file).href);
    }
  }

  console.log(`[E2E] Loaded ${totalFiles} test suite files. Executing E2E tests...\n`);

  const stats = await globalRunner.run();

  const reporter = new Reporter(options.reporter);
  reporter.report(globalRunner);

  process.exit(stats.failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('[E2E] Fatal runner exception:', err);
  process.exit(1);
});
