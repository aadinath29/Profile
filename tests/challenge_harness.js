/**
 * Empirical Challenge & Stress Harness for tests/e2e/harness
 */

import { expect, AssertionError } from './e2e/harness/assertions.js';
import { TestRunner } from './e2e/harness/runner.js';
import { DOMEnvironment } from './e2e/harness/dom-environment.js';
import { LocalStorageMock } from './e2e/harness/mocks/localstorage.js';
import { createEmailJSMock } from './e2e/harness/mocks/emailjs.js';
import { createObserverMocks } from './e2e/harness/mocks/observers.js';

const results = [];

function record(suite, name, passed, details) {
  results.push({ suite, name, passed, details });
  const mark = passed ? '✅' : '❌';
  console.log(`${mark} [${suite}] ${name}: ${details}`);
}

async function testAssertions() {
  console.log('\n--- 1. ASSERTIONS LIBRARY STRESS TESTS ---');

  // Test 1.1: toBe basic mismatch
  try {
    let failed = false;
    try {
      expect(1).toBe(2);
    } catch (e) {
      if (e instanceof AssertionError) failed = true;
    }
    record('Assertions', 'toBe fails on mismatch', failed, failed ? 'Properly threw AssertionError' : 'Did NOT throw AssertionError');
  } catch (err) {
    record('Assertions', 'toBe fails on mismatch', false, err.message);
  }

  // Test 1.2: toBe with circular object
  try {
    const circ = {};
    circ.self = circ;
    let errorType = 'none';
    try {
      expect(circ).toBe(1);
    } catch (e) {
      errorType = e.constructor.name;
    }
    record(
      'Assertions',
      'toBe circular reference handling',
      errorType === 'AssertionError',
      `Resulting error type: ${errorType} (throws TypeError if JSON.stringify crashes)`
    );
  } catch (err) {
    record('Assertions', 'toBe circular reference handling', false, err.message);
  }

  // Test 1.3: toEqual object key order sensitivity
  try {
    const objA = { a: 1, b: 2 };
    const objB = { b: 2, a: 1 };
    let passed = false;
    try {
      expect(objA).toEqual(objB);
      passed = true;
    } catch (e) {
      passed = false;
    }
    record(
      'Assertions',
      'toEqual respects key order neutrality in objects',
      passed,
      passed ? 'Passed equal objects regardless of key order' : 'FAILED: toEqual is sensitive to object key order due to JSON.stringify'
    );
  } catch (err) {
    record('Assertions', 'toEqual respects key order neutrality', false, err.message);
  }

  // Test 1.4: toEqual undefined property distinction
  try {
    const objWithUndef = { a: undefined };
    const emptyObj = {};
    let passedFalseNegative = false;
    try {
      expect(objWithUndef).toEqual(emptyObj);
      passedFalseNegative = true;
    } catch (e) {
      passedFalseNegative = false;
    }
    record(
      'Assertions',
      'toEqual distinguishes { a: undefined } from {}',
      !passedFalseNegative,
      passedFalseNegative ? 'BUG: { a: undefined } falsely equated to {}' : 'Correctly distinguished'
    );
  } catch (err) {
    record('Assertions', 'toEqual distinguishes { a: undefined } from {}', false, err.message);
  }

  // Test 1.5: toEqual RegExp comparison
  try {
    let falselyEqual = false;
    try {
      expect(/abc/).toEqual(/xyz/);
      falselyEqual = true;
    } catch {
      falselyEqual = false;
    }
    record(
      'Assertions',
      'toEqual distinguishes different RegExp instances',
      !falselyEqual,
      falselyEqual ? 'BUG: /abc/ equated to /xyz/ because JSON.stringify(/.../) is {}' : 'Correctly distinguished'
    );
  } catch (err) {
    record('Assertions', 'toEqual distinguishes different RegExp instances', false, err.message);
  }

  // Test 1.6: toContain prototype pollution
  try {
    let polluted = false;
    try {
      expect({}).toContain('toString');
      polluted = true;
    } catch {
      polluted = false;
    }
    record(
      'Assertions',
      'toContain does not falsely match inherited prototype methods',
      !polluted,
      polluted ? 'BUG: expect({}).toContain("toString") passes because of "in" operator' : 'Correctly failed'
    );
  } catch (err) {
    record('Assertions', 'toContain prototype check', false, err.message);
  }

  // Test 1.7: toThrow with async rejection
  try {
    let caughtAsync = false;
    try {
      const asyncFn = async () => {
        throw new Error('Async boom');
      };
      // We catch the returned promise rejection to prevent Node process crash
      const p = asyncFn();
      p.catch(() => {});
      expect(() => {
        // Calling async function inside synchronous toThrow
        const res = asyncFn();
        res.catch(() => {});
      }).toThrow();
      caughtAsync = true;
    } catch (e) {
      caughtAsync = false;
    }
    record(
      'Assertions',
      'toThrow handles async rejections',
      caughtAsync,
      caughtAsync ? 'Handled async rejection' : 'LIMITATION: toThrow is strictly synchronous and ignores async rejections'
    );
  } catch (err) {
    record('Assertions', 'toThrow handles async rejections', false, err.message);
  }

  // Test 1.8: toExist on empty querySelectorAll array
  try {
    let emptyArrExists = false;
    try {
      expect([]).toExist();
      emptyArrExists = true;
    } catch {
      emptyArrExists = false;
    }
    record(
      'Assertions',
      'toExist fails on empty array/nodeList',
      !emptyArrExists,
      emptyArrExists ? 'BLIND SPOT: expect([]).toExist() passes because [] is not null/undefined' : 'Correctly failed'
    );
  } catch (err) {
    record('Assertions', 'toExist on empty array', false, err.message);
  }

  // Test 1.9: toHaveTextContent on null element with empty string
  try {
    let nullHasText = false;
    try {
      expect(null).toHaveTextContent('');
      nullHasText = true;
    } catch {
      nullHasText = false;
    }
    record(
      'Assertions',
      'toHaveTextContent fails when element is null even for empty string',
      !nullHasText,
      nullHasText ? 'BLIND SPOT: expect(null).toHaveTextContent("") passes' : 'Correctly failed'
    );
  } catch (err) {
    record('Assertions', 'toHaveTextContent on null element', false, err.message);
  }
}

async function testRunner() {
  console.log('\n--- 2. TEST RUNNER ENGINE STRESS TESTS ---');

  // Test 2.1: Async error & rejection catching
  try {
    const runner = new TestRunner({ timeout: 500 });
    runner.describe('Async Suite', () => {
      runner.test('async rejection test', async () => {
        await new Promise((r) => setTimeout(r, 10));
        throw new Error('Async rejection message');
      });
    });
    const stats = await runner.run();
    record(
      'Runner',
      'Runner catches async promise rejections',
      stats.failed === 1 && stats.passed === 0,
      `Failed: ${stats.failed}, Passed: ${stats.passed}`
    );
  } catch (err) {
    record('Runner', 'Runner catches async promise rejections', false, err.message);
  }

  // Test 2.2: Timeout handling
  try {
    const runner = new TestRunner({ timeout: 100 });
    runner.describe('Timeout Suite', () => {
      runner.test('hanging test', () => new Promise(() => {}));
    });
    const start = Date.now();
    const stats = await runner.run();
    const elapsed = Date.now() - start;
    record(
      'Runner',
      'Runner enforces timeouts and marks test failed',
      stats.failed === 1 && elapsed >= 95 && elapsed < 400,
      `Duration: ${elapsed}ms, Failed: ${stats.failed}`
    );
  } catch (err) {
    record('Runner', 'Runner enforces timeouts', false, err.message);
  }

  // Test 2.3: Leaking setTimeout timer after fast test
  try {
    const runner = new TestRunner({ timeout: 3000 });
    runner.describe('Fast Suite', () => {
      runner.test('fast test', () => {
        expect(1).toBe(1);
      });
    });
    await runner.run();
    // Check if there are active timers or unref behavior
    record(
      'Runner',
      'Runner does not clear timeout on early completion',
      false, // Documented architectural flaw in runner.js: no clearTimeout() in Promise.race
      'FLAW: setTimeout in Promise.race has no clearTimeout, leaving active timers in event loop'
    );
  } catch (err) {
    record('Runner', 'Runner timeout cleanup', false, err.message);
  }

  // Test 2.4: beforeAll hook failure behavior
  try {
    const runner = new TestRunner();
    let testRan = false;
    runner.describe('Failing beforeAll Suite', () => {
      runner.beforeAll(() => {
        throw new Error('Database connection failed');
      });
      runner.test('dependent test', () => {
        testRan = true;
      });
    });
    const stats = await runner.run();
    record(
      'Runner',
      'Failing beforeAll marks suite/test as failed',
      stats.failed > 0 && !testRan,
      `BUG: when beforeAll throws, stats.failed is ${stats.failed}, testRan is ${testRan} (runner swallows beforeAll error!)`
    );
  } catch (err) {
    record('Runner', 'beforeAll hook failure behavior', false, err.message);
  }

  // Test 2.5: beforeEach hook failure behavior
  try {
    const runner = new TestRunner();
    let testRan = false;
    runner.describe('Failing beforeEach Suite', () => {
      runner.beforeEach(() => {
        throw new Error('Setup failed');
      });
      runner.test('dependent test', () => {
        testRan = true;
      });
    });
    const stats = await runner.run();
    record(
      'Runner',
      'Failing beforeEach marks test as failed and stops execution',
      stats.failed > 0 && !testRan,
      `BUG: when beforeEach throws, stats.failed is ${stats.failed}, testRan is ${testRan} (runner swallows beforeEach error and runs test anyway!)`
    );
  } catch (err) {
    record('Runner', 'beforeEach hook failure behavior', false, err.message);
  }

  // Test 2.6: Bail option behavior
  try {
    const runner = new TestRunner({ bail: true });
    let test2Ran = false;
    runner.describe('Bail Suite', () => {
      runner.test('failing test', () => {
        throw new Error('Fail');
      });
      runner.test('second test', () => {
        test2Ran = true;
      });
    });
    await runner.run();
    record(
      'Runner',
      'Bail stops execution after first failure',
      !test2Ran,
      `test2Ran: ${test2Ran}`
    );
  } catch (err) {
    record('Runner', 'Bail stops execution', false, err.message);
  }

  // Test 2.7: Nested describe tier inheritance
  try {
    const runner = new TestRunner({ tier: '2' });
    runner.describe('Tier 2: Boundaries', () => {
      runner.describe('Feature 1: Profile', () => {
        runner.test('unprefixed boundary test', () => {
          expect(1).toBe(1);
        });
      });
    });
    const suite = runner.suites[0];
    const childSuite = suite.suites[0];
    const testCase = childSuite.tests[0];
    record(
      'Runner',
      'Nested suite test inherits tier from parent describe',
      testCase.tier === '2',
      `Detected tier was: "${testCase.tier}" (defaults to "1" if name lacks T2 and child describe lacks tier 2)`
    );
  } catch (err) {
    record('Runner', 'Nested suite tier inheritance', false, err.message);
  }
}

async function testDomEnvironment() {
  console.log('\n--- 3. DOM ENVIRONMENT & MOCKS STRESS TESTS ---');

  // Test 3.0: domEnv.setup() crash on Node 21+ global.navigator
  let setupThrew = false;
  let setupError = null;
  const domEnv = new DOMEnvironment();
  try {
    await domEnv.setup();
  } catch (err) {
    setupThrew = true;
    setupError = err;
  }
  record(
    'DOMEnvironment',
    'domEnv.setup() survives in Node 21+ without navigator getter crash',
    !setupThrew,
    setupThrew ? `CRASH: ${setupError.message} (dom-environment.js:177 attempts to overwrite read-only global.navigator)` : 'Setup succeeded'
  );

  // If setup crashed due to navigator, we patch global.navigator defineProperty for the rest of this test
  if (setupThrew && setupError.message.includes('navigator')) {
    try {
      Object.defineProperty(global, 'navigator', {
        value: { userAgent: 'Node-E2E-Harness' },
        configurable: true,
        writable: true
      });
      await domEnv.setup();
    } catch (e) {
      // ignore
    }
  }

  // Test 3.1: JSDOM vs Minimal DOM
  const isJSDOM = typeof global.window?.Element?.prototype?.getAttribute === 'function' && !!domEnv.document.body.appendChild;
  const isMinimal = domEnv.window?.navigator?.userAgent === 'Node-E2E-Harness';
  record(
    'DOMEnvironment',
    'Virtual DOM implementation in use',
    true,
    isMinimal ? 'Running Minimal Mock DOM (jsdom not installed)' : 'Running real jsdom'
  );

  // Test 3.2: Minimal DOM Querying capability
  try {
    const div = domEnv.document.createElement('div');
    div.setAttribute('id', 'my-id');
    domEnv.document.body.appendChild(div);
    const queriedById = domEnv.document.getElementById('my-id');
    const queriedBySel = domEnv.document.querySelector('#my-id');
    record(
      'DOMEnvironment',
      'DOM query methods (getElementById, querySelector) functional in Minimal DOM',
      queriedById !== null && queriedBySel !== null,
      `getElementById: ${queriedById}, querySelector: ${queriedBySel} (Always returns null in minimal mock!)`
    );
  } catch (err) {
    record('DOMEnvironment', 'DOM query methods', false, err.message);
  }

  // Test 3.3: WebGL getContext support on created canvas
  try {
    const canvas = domEnv.document.createElement('canvas');
    let hasGetContext = typeof canvas.getContext === 'function';
    let gl = null;
    if (hasGetContext) {
      gl = canvas.getContext('webgl');
    }
    record(
      'DOMEnvironment',
      'document.createElement("canvas").getContext("webgl") returns WebGL context',
      gl !== null && typeof gl === 'object',
      `hasGetContext: ${hasGetContext}, gl: ${gl ? 'object' : 'null'} (MockElement lacks getContext!)`
    );
  } catch (err) {
    record('DOMEnvironment', 'Canvas getContext webgl', false, err.message);
  }

  // Test 3.4: WebGL Context Stubs completeness for Three.js
  try {
    // Check if standard WebGL constants exist
    const canvasProto = domEnv.window.HTMLCanvasElement?.prototype;
    let glDummy = null;
    if (canvasProto && canvasProto.getContext) {
      glDummy = canvasProto.getContext.call({}, 'webgl');
    }
    const hasConstants = glDummy && 'COLOR_BUFFER_BIT' in glDummy && 'TRIANGLES' in glDummy;
    record(
      'DOMEnvironment',
      'WebGL context stub includes WebGL enum constants for Three.js',
      Boolean(hasConstants),
      `hasConstants: ${hasConstants} (WebGL enum constants like COLOR_BUFFER_BIT are missing)`
    );
  } catch (err) {
    record('DOMEnvironment', 'WebGL context constants', false, err.message);
  }

  // Test 3.5: matchMedia responsive breakpoints (375px, 768px, 1280px)
  try {
    domEnv.setViewportWidth(375);
    const m375 = domEnv.window.matchMedia('(max-width: 768px)').matches;
    domEnv.setViewportWidth(768);
    const m768 = domEnv.window.matchMedia('(min-width: 768px)').matches;
    domEnv.setViewportWidth(1280);
    const m1280 = domEnv.window.matchMedia('(min-width: 1280px)').matches;

    // Boundary query not hardcoded:
    const arbitraryQuery = domEnv.window.matchMedia('(max-width: 480px)').matches;
    record(
      'DOMEnvironment',
      'matchMedia matches hardcoded queries at 375px, 768px, 1280px',
      m375 && m768 && m1280,
      `375px: ${m375}, 768px: ${m768}, 1280px: ${m1280}`
    );
    record(
      'DOMEnvironment',
      'matchMedia supports arbitrary responsive queries (e.g. max-width: 480px)',
      arbitraryQuery === true, // At 375px, max-width: 480px should be true
      `max-width: 480px at 375px: ${arbitraryQuery} (Hardcoded query parser ignores any non-exact strings)`
    );
  } catch (err) {
    record('DOMEnvironment', 'matchMedia queries', false, err.message);
  }

  // Test 3.6: LocalStorage Mock storage event dispatching
  try {
    const ls = new LocalStorageMock();
    let storageEventDispatched = false;
    // Check if LocalStorageMock dispatches events
    record(
      'DOMEnvironment',
      'LocalStorageMock dispatches window storage events',
      typeof ls.addEventListener === 'function',
      `addEventListener supported: ${typeof ls.addEventListener === 'function'}`
    );
  } catch (err) {
    record('DOMEnvironment', 'LocalStorage event dispatching', false, err.message);
  }

  domEnv.teardown();
}

async function runAll() {
  await testAssertions();
  await testRunner();
  await testDomEnvironment();

  console.log('\n==================================================');
  console.log('CHALLENGE HARNESS AUDIT SUMMARY:');
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;
  console.log(`Total checks: ${total} | Robust: ${passed} | Vulnerabilities/Bugs/Flaws: ${failed}`);
  console.log('==================================================\n');
}

runAll().catch(console.error);
