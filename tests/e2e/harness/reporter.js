/**
 * Multi-Format E2E Reporter (Console Table, TAP v13, JSON)
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

import fs from 'node:fs';
import path from 'node:path';

export class Reporter {
  constructor(format = 'console') {
    this.format = format;
  }

  report(runner) {
    if (this.format === 'tap') {
      this._reportTAP(runner);
    } else if (this.format === 'json') {
      this._reportJSON(runner);
      this._saveJSON(runner);
    } else {
      this._reportConsole(runner);
      this._saveJSON(runner);
    }
  }

  _reportConsole(runner) {
    const { totalSuites, totalTests, passed, failed, skipped, startTime, endTime } = runner.stats;
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log('\n======================================================================');
    console.log('                 E2E TEST RUNNER EXECUTION REPORT                     ');
    console.log('======================================================================\n');

    const tierGroups = { '1': [], '2': [], '3': [], '4': [] };

    const collectTests = (suite) => {
      for (const t of suite.tests) {
        const tier = t.tier || '1';
        if (tierGroups[tier]) {
          tierGroups[tier].push({ ...t, suiteName: suite.name });
        } else {
          tierGroups['1'].push({ ...t, suiteName: suite.name });
        }
      }
      for (const sub of suite.suites) {
        collectTests(sub);
      }
    };

    for (const suite of runner.suites) {
      collectTests(suite);
    }

    const tierLabels = {
      '1': 'Tier 1: Feature Coverage (Features 1 to 31, 34)',
      '2': 'Tier 2: Boundary & Corner Cases (Features 1 to 31, 34)',
      '3': 'Tier 3: Cross-Feature Pairwise Combinations',
      '4': 'Tier 4: Real-World Application Scenarios'
    };

    for (const [tier, tests] of Object.entries(tierGroups)) {
      if (tests.length === 0) continue;
      const tierPassed = tests.filter((t) => t.status === 'passed').length;
      const tierFailed = tests.filter((t) => t.status === 'failed').length;
      const tierSkipped = tests.filter((t) => t.status === 'skipped').length;
      const label = tierLabels[tier] || `Tier ${tier}`;

      console.log(`\x1b[1m${label}\x1b[0m`);
      console.log(`  Passed: \x1b[32m${tierPassed}\x1b[0m | Failed: \x1b[31m${tierFailed}\x1b[0m | Skipped: \x1b[33m${tierSkipped}\x1b[0m | Total: ${tests.length}`);

      // Print first 5 tests or failing tests
      let shown = 0;
      for (const t of tests) {
        if (t.status === 'failed' || shown < 3 || tests.length <= 10) {
          const icon =
            t.status === 'passed'
              ? '\x1b[32m✓\x1b[0m'
              : t.status === 'failed'
              ? '\x1b[31m✕\x1b[0m'
              : '\x1b[33m-\x1b[0m';
          console.log(`    ${icon} ${t.name} \x1b[90m(${t.duration}ms)\x1b[0m`);
          if (t.error) {
            console.log(`      \x1b[31mError: ${t.error.message}\x1b[0m`);
            if (t.error.stack) {
              const stackSnippet = t.error.stack.split('\n').slice(1, 3).join('\n      ');
              console.log(`      \x1b[90m${stackSnippet}\x1b[0m`);
            }
          }
          shown++;
        }
      }
      if (shown < tests.length) {
        console.log(`    \x1b[90m... and ${tests.length - shown} more passed tests in this tier\x1b[0m`);
      }
      console.log('');
    }

    console.log('----------------------------------------------------------------------');
    console.log(`Total Suites:  ${totalSuites}`);
    console.log(`Total Tests:   ${totalTests}`);
    console.log(`Passed:        \x1b[32m${passed}\x1b[0m`);
    console.log(`Failed:        \x1b[31m${failed}\x1b[0m`);
    console.log(`Skipped:       \x1b[33m${skipped}\x1b[0m`);
    console.log(`Duration:      ${duration}s`);
    console.log('----------------------------------------------------------------------\n');

    if (failed === 0) {
      console.log('\x1b[32m✔ ALL E2E TESTS PASSED SUCCESSFULLY (Exit Code 0)\x1b[0m\n');
    } else {
      console.log(`\x1b[31m✘ ${failed} TEST(S) FAILED (Exit Code 1)\x1b[0m\n`);
    }
  }

  _reportTAP(runner) {
    const allTests = [];
    const collect = (s) => {
      allTests.push(...s.tests);
      s.suites.forEach(collect);
    };
    runner.suites.forEach(collect);

    console.log('TAP version 13');
    console.log(`1..${allTests.length}`);
    allTests.forEach((t, idx) => {
      const num = idx + 1;
      if (t.status === 'passed') {
        console.log(`ok ${num} - [Tier ${t.tier}] ${t.name}`);
      } else if (t.status === 'skipped') {
        console.log(`ok ${num} - [Tier ${t.tier}] ${t.name} # SKIP`);
      } else {
        console.log(`not ok ${num} - [Tier ${t.tier}] ${t.name}`);
        console.log(`  ---`);
        console.log(`  message: ${t.error?.message || 'Unknown error'}`);
        console.log(`  ...`);
      }
    });
  }

  _reportJSON(runner) {
    const payload = this._buildJSONPayload(runner);
    console.log(JSON.stringify(payload, null, 2));
  }

  _buildJSONPayload(runner) {
    return {
      timestamp: new Date().toISOString(),
      stats: runner.stats,
      suites: runner.suites.map(this._serializeSuite)
    };
  }

  _saveJSON(runner) {
    try {
      const reportDir = path.resolve(process.cwd(), 'tests/e2e/reports');
      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
      }
      const reportPath = path.join(reportDir, 'e2e-report.json');
      const payload = this._buildJSONPayload(runner);
      fs.writeFileSync(reportPath, JSON.stringify(payload, null, 2), 'utf-8');
    } catch {
      // Non-fatal if reports folder cannot be written
    }
  }

  _serializeSuite(s) {
    return {
      name: s.name,
      tests: s.tests.map((t) => ({
        name: t.name,
        tier: t.tier,
        status: t.status,
        duration: t.duration,
        error: t.error ? t.error.message : null
      })),
      suites: s.suites.map((sub) => (sub ? {
        name: sub.name,
        tests: sub.tests.map((t) => ({
          name: t.name,
          tier: t.tier,
          status: t.status,
          duration: t.duration,
          error: t.error ? t.error.message : null
        })),
        suites: sub.suites.map((child) => ({
          name: child.name,
          tests: child.tests.map((t) => ({
            name: t.name,
            tier: t.tier,
            status: t.status,
            duration: t.duration,
            error: t.error ? t.error.message : null
          }))
        }))
      } : null)).filter(Boolean)
    };
  }
}
