/**
 * Complete empirical verification of proposed patches for explorer_rem_1
 */

import { AssertionError } from '../../tests/e2e/harness/assertions.js';

// ==========================================
// 1. PATCHED ASSERTIONS
// ==========================================

function safeStringify(val, seen = new WeakSet()) {
  if (val === undefined) return 'undefined';
  if (typeof val === 'function') return `[Function: ${val.name || 'anonymous'}]`;
  if (typeof val === 'symbol') return val.toString();
  if (typeof val === 'bigint') return `${val}n`;
  if (val instanceof RegExp) return val.toString();
  if (val instanceof Date) return `Date(${val.toISOString()})`;
  if (val === null || typeof val !== 'object') {
    return JSON.stringify(val);
  }
  if (seen.has(val)) return '[Circular]';
  seen.add(val);

  try {
    if (Array.isArray(val)) {
      return '[' + val.map((item) => safeStringify(item, seen)).join(', ') + ']';
    }
    if (val instanceof Set) {
      return 'Set(' + val.size + ') {' + Array.from(val).map((item) => safeStringify(item, seen)).join(', ') + '}';
    }
    if (val instanceof Map) {
      return 'Map(' + val.size + ') {' + Array.from(val.entries()).map(([k, v]) => `${safeStringify(k, seen)} => ${safeStringify(v, seen)}`).join(', ') + '}';
    }
    const entries = Reflect.ownKeys(val).map((k) => `${String(k)}: ${safeStringify(val[k], seen)}`);
    return '{ ' + entries.join(', ') + ' }';
  } catch {
    return String(val);
  }
}

function isObject(val) {
  return val !== null && (typeof val === 'object' || typeof val === 'function');
}

function deepEqual(a, b, seen = new Map()) {
  if (Object.is(a, b)) return true;
  if (!isObject(a) || !isObject(b)) return false;
  if (a.constructor !== b.constructor) return false;

  if (a instanceof Date) {
    return a.getTime() === b.getTime() || (Number.isNaN(a.getTime()) && Number.isNaN(b.getTime()));
  }

  if (a instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  if (seen.has(a)) {
    return seen.get(a) === b;
  }
  seen.set(a, b);

  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const itemA of a) {
      let matched = false;
      for (const itemB of b) {
        if (deepEqual(itemA, itemB, seen)) {
          matched = true;
          break;
        }
      }
      if (!matched) return false;
    }
    return true;
  }

  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [keyA, valA] of a) {
      let matched = false;
      for (const [keyB, valB] of b) {
        if (deepEqual(keyA, keyB, seen) && deepEqual(valA, valB, seen)) {
          matched = true;
          break;
        }
      }
      if (!matched) return false;
    }
    return true;
  }

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i], seen)) return false;
    }
    return true;
  }

  if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
    if (a.byteLength !== b.byteLength) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  const keysA = Reflect.ownKeys(a);
  const keysB = Reflect.ownKeys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key], seen)) return false;
  }

  return true;
}

export function patchedExpect(actual) {
  let isNot = false;

  const createMatcher = (fn) => {
    return (...args) => {
      const result = fn(actual, ...args);
      const passed = isNot ? !result.pass : result.pass;
      if (!passed) {
        const msg = isNot ? result.negatedMessage : result.message;
        throw new AssertionError(msg);
      }
    };
  };

  const matchers = {
    toBe: createMatcher((act, exp) => ({
      pass: Object.is(act, exp),
      message: `Expected ${safeStringify(act)} to be ${safeStringify(exp)}`,
      negatedMessage: `Expected ${safeStringify(act)} not to be ${safeStringify(exp)}`
    })),

    toEqual: createMatcher((act, exp) => ({
      pass: deepEqual(act, exp),
      message: `Expected ${safeStringify(act)} to equal ${safeStringify(exp)}`,
      negatedMessage: `Expected ${safeStringify(act)} not to equal ${safeStringify(exp)}`
    })),

    toBeTruthy: createMatcher((act) => ({
      pass: Boolean(act),
      message: `Expected ${safeStringify(act)} to be truthy`,
      negatedMessage: `Expected ${safeStringify(act)} not to be truthy`
    })),

    toBeFalsy: createMatcher((act) => ({
      pass: !Boolean(act),
      message: `Expected ${safeStringify(act)} to be falsy`,
      negatedMessage: `Expected ${safeStringify(act)} not to be falsy`
    })),

    toBeNull: createMatcher((act) => ({
      pass: act === null,
      message: `Expected value to be null, received ${safeStringify(act)}`,
      negatedMessage: `Expected value not to be null`
    })),

    toBeDefined: createMatcher((act) => ({
      pass: act !== undefined,
      message: `Expected value to be defined, received undefined`,
      negatedMessage: `Expected value to be undefined`
    })),

    toBeUndefined: createMatcher((act) => ({
      pass: act === undefined,
      message: `Expected value to be undefined, received ${safeStringify(act)}`,
      negatedMessage: `Expected value not to be undefined`
    })),

    toContain: createMatcher((act, item) => {
      let pass = false;
      if (typeof act === 'string') pass = act.includes(item);
      else if (Array.isArray(act)) pass = act.includes(item);
      else if (act instanceof Set || act instanceof Map) pass = act.has(item);
      else if (act && typeof act === 'object') pass = Object.prototype.hasOwnProperty.call(act, item);
      return {
        pass,
        message: `Expected ${safeStringify(act)} to contain ${safeStringify(item)}`,
        negatedMessage: `Expected ${safeStringify(act)} not to contain ${safeStringify(item)}`
      };
    }),

    toMatch: createMatcher((act, regex) => {
      const reg = typeof regex === 'string' ? new RegExp(regex) : regex;
      const pass = reg.test(String(act));
      return {
        pass,
        message: `Expected "${act}" to match ${reg}`,
        negatedMessage: `Expected "${act}" not to match ${reg}`
      };
    }),

    toBeGreaterThan: createMatcher((act, num) => ({
      pass: Number(act) > Number(num),
      message: `Expected ${act} > ${num}`,
      negatedMessage: `Expected ${act} <= ${num}`
    })),

    toBeGreaterThanOrEqual: createMatcher((act, num) => ({
      pass: Number(act) >= Number(num),
      message: `Expected ${act} >= ${num}`,
      negatedMessage: `Expected ${act} < ${num}`
    })),

    toBeLessThan: createMatcher((act, num) => ({
      pass: Number(act) < Number(num),
      message: `Expected ${act} < ${num}`,
      negatedMessage: `Expected ${act} >= ${num}`
    })),

    toBeLessThanOrEqual: createMatcher((act, num) => ({
      pass: Number(act) <= Number(num),
      message: `Expected ${act} <= ${num}`,
      negatedMessage: `Expected ${act} > ${num}`
    })),

    toHaveLength: createMatcher((act, len) => {
      const actualLen = act ? act.length : undefined;
      return {
        pass: actualLen === len,
        message: `Expected length ${len}, received ${actualLen}`,
        negatedMessage: `Expected length not to be ${len}`
      };
    }),

    toHaveProperty: createMatcher((act, prop, val) => {
      const hasProp = act && typeof act === 'object' && Object.prototype.hasOwnProperty.call(act, prop);
      const pass = val !== undefined ? hasProp && Object.is(act[prop], val) : hasProp;
      return {
        pass,
        message: val !== undefined
          ? `Expected property "${prop}" with value ${safeStringify(val)}, received ${hasProp ? safeStringify(act[prop]) : 'missing'}`
          : `Expected property "${prop}" to exist`,
        negatedMessage: `Expected property "${prop}" not to exist`
      };
    }),

    toThrow: (expected) => {
      if (typeof actual !== 'function' && !(actual && typeof actual.then === 'function')) {
        throw new AssertionError('expect(fn).toThrow requires a function or promise');
      }
      let threw = false;
      let error = null;
      let result;
      try {
        result = typeof actual === 'function' ? actual() : actual;
      } catch (e) {
        threw = true;
        error = e;
      }

      // Handle async function or Promise return
      if (result && typeof result.then === 'function') {
        const verifyError = (err) => {
          if (isNot) {
            throw new AssertionError(`Expected function/promise not to throw, but it threw: ${err?.message || err}`);
          }
          if (expected) {
            const msg = err?.message || String(err);
            if (expected instanceof RegExp && !expected.test(msg)) {
              throw new AssertionError(`Expected error message "${msg}" to match ${expected}`);
            } else if (typeof expected === 'string' && !msg.includes(expected)) {
              throw new AssertionError(`Expected error message "${msg}" to contain "${expected}"`);
            }
          }
        };

        return result.then(
          () => {
            if (!isNot) {
              throw new AssertionError('Expected function/promise to throw, but it resolved');
            }
          },
          (rejection) => {
            verifyError(rejection);
          }
        );
      }

      if (!isNot && !threw) {
        throw new AssertionError('Expected function to throw, but it did not');
      }
      if (isNot && threw) {
        throw new AssertionError(`Expected function not to throw, but it threw: ${error?.message || error}`);
      }
      if (threw && expected) {
        const msg = error?.message || String(error);
        if (expected instanceof RegExp && !expected.test(msg)) {
          throw new AssertionError(`Expected error message "${msg}" to match ${expected}`);
        } else if (typeof expected === 'string' && !msg.includes(expected)) {
          throw new AssertionError(`Expected error message "${msg}" to contain "${expected}"`);
        }
      }
    },

    toThrowAsync: async (expected) => {
      if (typeof actual !== 'function' && !(actual && typeof actual.then === 'function')) {
        throw new AssertionError('expect(fn).toThrowAsync requires a function or promise');
      }
      let threw = false;
      let error = null;
      try {
        if (typeof actual === 'function') {
          await actual();
        } else {
          await actual;
        }
      } catch (e) {
        threw = true;
        error = e;
      }
      if (!isNot && !threw) {
        throw new AssertionError('Expected function to throw, but it did not');
      }
      if (isNot && threw) {
        throw new AssertionError(`Expected function not to throw, but it threw: ${error?.message || error}`);
      }
      if (threw && expected) {
        const msg = error?.message || String(error);
        if (expected instanceof RegExp && !expected.test(msg)) {
          throw new AssertionError(`Expected error message "${msg}" to match ${expected}`);
        } else if (typeof expected === 'string' && !msg.includes(expected)) {
          throw new AssertionError(`Expected error message "${msg}" to contain "${expected}"`);
        }
      }
    },

    // DOM Matchers
    toHaveTextContent: createMatcher((el, expected) => {
      if (!el || (typeof el !== 'object' && typeof el !== 'string')) {
        return {
          pass: false,
          message: `Expected valid DOM element to have text content "${expected}", but element is ${safeStringify(el)}`,
          negatedMessage: `Expected element not to have text content "${expected}"`
        };
      }
      const raw = typeof el === 'string' ? el : (el.textContent !== undefined ? el.textContent : (el.innerText || ''));
      const text = String(raw).trim();
      const pass = expected instanceof RegExp ? expected.test(text) : text.includes(expected);
      return {
        pass,
        message: `Expected element to have text content "${expected}", received "${text}"`,
        negatedMessage: `Expected element not to have text content "${expected}"`
      };
    }),

    toHaveAttribute: createMatcher((el, name, expectedVal) => {
      const hasAttr = el && typeof el.getAttribute === 'function' && el.getAttribute(name) !== null;
      const attrVal = hasAttr ? el.getAttribute(name) : null;
      const pass = expectedVal !== undefined ? attrVal === String(expectedVal) : hasAttr;
      return {
        pass,
        message: expectedVal !== undefined
          ? `Expected element to have attribute "${name}='${expectedVal}'", received "${name}='${attrVal}'"`
          : `Expected element to have attribute "${name}"`,
        negatedMessage: `Expected element not to have attribute "${name}"`
      };
    }),

    toHaveClass: createMatcher((el, className) => {
      const classes = el && el.classList ? Array.from(el.classList) : [];
      const pass = classes.includes(className);
      return {
        pass,
        message: `Expected element to have class "${className}", classes present: [${classes.join(', ')}]`,
        negatedMessage: `Expected element not to have class "${className}"`
      };
    }),

    toExist: createMatcher((el) => {
      let pass = el !== null && el !== undefined;
      if (pass) {
        if (Array.isArray(el) || (typeof el === 'object' && typeof el.length === 'number' && !('tagName' in el) && !('nodeType' in el))) {
          pass = el.length > 0;
        }
      }
      return {
        pass,
        message: `Expected element or collection to exist in DOM, but it was not found or empty`,
        negatedMessage: `Expected element or collection not to exist in DOM, but it was found`
      };
    }),

    toHaveCount: createMatcher((nodeListOrArray, count) => {
      const len = nodeListOrArray ? (nodeListOrArray.length || 0) : 0;
      return {
        pass: len === count,
        message: `Expected count of elements to be ${count}, received ${len}`,
        negatedMessage: `Expected count of elements not to be ${count}`
      };
    })
  };

  const handler = {
    get(target, prop) {
      if (prop === 'not') {
        isNot = !isNot;
        return proxy;
      }
      if (prop === 'rejects') {
        return new Proxy({}, {
          get(_, matcherName) {
            return async (...args) => {
              try {
                const val = typeof actual === 'function' ? await actual() : await actual;
                throw new AssertionError(`Expected promise to reject, but it resolved with ${safeStringify(val)}`);
              } catch (rejectionErr) {
                if (rejectionErr instanceof AssertionError && rejectionErr.message.startsWith('Expected promise to reject')) {
                  throw rejectionErr;
                }
                const rejectedExpect = patchedExpect(rejectionErr);
                if (matcherName === 'toThrow') {
                  const expected = args[0];
                  if (expected) {
                    const msg = rejectionErr?.message || String(rejectionErr);
                    if (expected instanceof RegExp && !expected.test(msg)) {
                      throw new AssertionError(`Expected error message "${msg}" to match ${expected}`);
                    } else if (typeof expected === 'string' && !msg.includes(expected)) {
                      throw new AssertionError(`Expected error message "${msg}" to contain "${expected}"`);
                    }
                  }
                  return;
                }
                return rejectedExpect[matcherName](...args);
              }
            };
          }
        });
      }
      if (prop === 'resolves') {
        return new Proxy({}, {
          get(_, matcherName) {
            return async (...args) => {
              const val = typeof actual === 'function' ? await actual() : await actual;
              return patchedExpect(val)[matcherName](...args);
            };
          }
        });
      }
      if (prop in matchers) {
        return matchers[prop];
      }
      return target[prop];
    }
  };

  const proxy = new Proxy({}, handler);
  return proxy;
}

// ==========================================
// 2. PATCHED TEST RUNNER
// ==========================================

export class PatchedTestRunner {
  constructor(options = {}) {
    this.suites = [];
    this.currentSuite = null;
    this.options = {
      bail: options.bail || false,
      timeout: options.timeout || 5000,
      grep: options.grep ? new RegExp(options.grep, 'i') : null,
      tier: options.tier || null,
      ...options
    };
    this.stats = {
      totalSuites: 0,
      totalTests: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      startTime: 0,
      endTime: 0
    };
  }

  describe(name, fn) {
    const parent = this.currentSuite;
    const suite = {
      name,
      parent,
      tests: [],
      beforeAllHooks: [],
      beforeEachHooks: [],
      afterEachHooks: [],
      afterAllHooks: [],
      suites: []
    };

    if (parent) {
      parent.suites.push(suite);
    } else {
      this.suites.push(suite);
    }

    this.currentSuite = suite;
    try {
      fn();
    } finally {
      this.currentSuite = parent;
    }
  }

  test(name, fn, options = {}) {
    if (!this.currentSuite) {
      throw new Error(`test("${name}") must be declared inside a describe block.`);
    }

    // Walk up suite hierarchy for tier inheritance if not specified
    let suitePtr = this.currentSuite;
    let inheritedTier = null;
    while (suitePtr) {
      const match = suitePtr.name.match(/tier\s*([1-4])/i);
      if (match) {
        inheritedTier = match[1];
        break;
      }
      suitePtr = suitePtr.parent;
    }

    const detectedTier =
      options.tier ||
      inheritedTier ||
      name.match(/T([1-4])/i)?.[1] ||
      '1';

    this.currentSuite.tests.push({
      name,
      fn,
      tier: String(detectedTier),
      status: 'pending',
      duration: 0,
      error: null
    });
  }

  it(name, fn, options = {}) {
    this.test(name, fn, options);
  }

  beforeAll(fn) {
    if (this.currentSuite) this.currentSuite.beforeAllHooks.push(fn);
  }

  beforeEach(fn) {
    if (this.currentSuite) this.currentSuite.beforeEachHooks.push(fn);
  }

  afterEach(fn) {
    if (this.currentSuite) this.currentSuite.afterEachHooks.push(fn);
  }

  afterAll(fn) {
    if (this.currentSuite) this.currentSuite.afterAllHooks.push(fn);
  }

  async run() {
    this.stats.startTime = Date.now();
    for (const suite of this.suites) {
      await this._runSuite(suite);
      if (this.options.bail && this.stats.failed > 0) break;
    }
    this.stats.endTime = Date.now();
    return this.stats;
  }

  async _runSuite(suite) {
    this.stats.totalSuites++;

    // Execute beforeAll hooks and track failure
    let beforeAllError = null;
    for (const hook of suite.beforeAllHooks) {
      try {
        await hook();
      } catch (err) {
        beforeAllError = err;
        console.error(`Error in beforeAll hook for "${suite.name}":`, err.message);
        break;
      }
    }

    if (beforeAllError) {
      // If beforeAll fails, all tests in this suite fail precondition
      if (suite.tests.length === 0) {
        this.stats.failed++;
      } else {
        for (const testCase of suite.tests) {
          // Check grep/tier filter
          if (
            this.options.grep &&
            !this.options.grep.test(testCase.name) &&
            !this.options.grep.test(suite.name)
          ) {
            testCase.status = 'skipped';
            this.stats.skipped++;
            continue;
          }
          if (this.options.tier && String(testCase.tier) !== String(this.options.tier)) {
            testCase.status = 'skipped';
            this.stats.skipped++;
            continue;
          }

          this.stats.totalTests++;
          testCase.status = 'failed';
          testCase.duration = 0;
          testCase.error = new Error(`beforeAll hook failed: ${beforeAllError.message}`);
          testCase.error.stack = beforeAllError.stack;
          this.stats.failed++;
          if (this.options.bail) break;
        }
      }

      // Run afterAll hooks for cleanup attempt
      for (const hook of suite.afterAllHooks) {
        try {
          await hook();
        } catch (err) {
          console.error(`Error in afterAll hook:`, err.message);
        }
      }
      return;
    }

    // Execute tests
    for (const testCase of suite.tests) {
      // Filter by grep
      if (
        this.options.grep &&
        !this.options.grep.test(testCase.name) &&
        !this.options.grep.test(suite.name)
      ) {
        testCase.status = 'skipped';
        this.stats.skipped++;
        continue;
      }

      // Filter by tier
      if (this.options.tier && String(testCase.tier) !== String(this.options.tier)) {
        testCase.status = 'skipped';
        this.stats.skipped++;
        continue;
      }

      this.stats.totalTests++;

      const testStart = Date.now();

      // Execute beforeEach hooks (from root suite down to current)
      let beforeEachError = null;
      const beforeEachHooks = this._collectHooks(suite, 'beforeEachHooks');
      for (const hook of beforeEachHooks) {
        try {
          await hook();
        } catch (err) {
          beforeEachError = err;
          console.error(`Error in beforeEach hook:`, err.message);
          break;
        }
      }

      if (beforeEachError) {
        testCase.status = 'failed';
        testCase.duration = Date.now() - testStart;
        testCase.error = new Error(`beforeEach hook failed: ${beforeEachError.message}`);
        testCase.error.stack = beforeEachError.stack;
        this.stats.failed++;

        // Run afterEach hooks for cleanup
        const afterEachHooks = this._collectHooks(suite, 'afterEachHooks');
        for (const hook of afterEachHooks) {
          try {
            await hook();
          } catch (hookErr) {
            console.error(`Error in afterEach hook: ${hookErr.message}`);
          }
        }

        if (this.options.bail && this.stats.failed > 0) return;
        continue;
      }

      let timerId = null;
      try {
        const timeoutPromise = new Promise((_, reject) => {
          timerId = setTimeout(
            () => reject(new Error(`Timeout of ${this.options.timeout}ms exceeded`)),
            this.options.timeout
          );
        });

        await Promise.race([
          Promise.resolve().then(() => testCase.fn()),
          timeoutPromise
        ]);
        testCase.status = 'passed';
        testCase.duration = Date.now() - testStart;
        this.stats.passed++;
      } catch (err) {
        testCase.status = 'failed';
        testCase.duration = Date.now() - testStart;
        testCase.error = err;
        this.stats.failed++;
      } finally {
        if (timerId !== null) {
          clearTimeout(timerId);
        }
      }

      // Execute afterEach hooks
      let afterEachError = null;
      const afterEachHooks = this._collectHooks(suite, 'afterEachHooks');
      for (const hook of afterEachHooks) {
        try {
          await hook();
        } catch (hookErr) {
          afterEachError = hookErr;
          console.error(`Error in afterEach hook: ${hookErr.message}`);
        }
      }

      if (afterEachError && testCase.status === 'passed') {
        testCase.status = 'failed';
        testCase.error = new Error(`afterEach hook failed: ${afterEachError.message}`);
        testCase.error.stack = afterEachError.stack;
        this.stats.passed--;
        this.stats.failed++;
      }

      if (this.options.bail && this.stats.failed > 0) return;
    }

    // Run nested child suites
    for (const childSuite of suite.suites) {
      await this._runSuite(childSuite);
      if (this.options.bail && this.stats.failed > 0) return;
    }

    // Execute afterAll hooks
    for (const hook of suite.afterAllHooks) {
      try {
        await hook();
      } catch (err) {
        console.error(`Error in afterAll hook:`, err.message);
        this.stats.failed++;
      }
    }
  }

  _collectHooks(suite, hookName) {
    const hooks = [];
    let current = suite;
    while (current) {
      if (current[hookName]) {
        hooks.unshift(...current[hookName]);
      }
      current = current.parent;
    }
    return hooks;
  }
}

// ==========================================
// 3. RUN VERIFICATION TESTS
// ==========================================

async function runTests() {
  console.log('\n--- VERIFYING PATCHED ASSERTIONS ---');

  // 1. toBe circular reference
  const circA = {}; circA.self = circA;
  const circB = {}; circB.self = circB;
  let circularHandled = false;
  try {
    patchedExpect(circA).toBe(circB);
  } catch (e) {
    circularHandled = (e.name === 'AssertionError');
  }
  console.log('1. toBe circular reference:', circularHandled ? 'PASSED' : 'FAILED');

  // 2. toEqual key order neutrality
  let keyOrderNeutral = false;
  try {
    patchedExpect({ a: 1, b: 2 }).toEqual({ b: 2, a: 1 });
    keyOrderNeutral = true;
  } catch {
    keyOrderNeutral = false;
  }
  console.log('2. toEqual key order neutrality:', keyOrderNeutral ? 'PASSED' : 'FAILED');

  // 3. toEqual undefined property distinction
  let undefDistinguished = false;
  try {
    patchedExpect({ a: undefined }).toEqual({});
  } catch (e) {
    undefDistinguished = (e.name === 'AssertionError');
  }
  console.log('3. toEqual undefined property distinction:', undefDistinguished ? 'PASSED' : 'FAILED');

  // 4. toEqual RegExp distinction
  let regExpDistinguished = false;
  try {
    patchedExpect(/abc/).toEqual(/xyz/);
  } catch (e) {
    regExpDistinguished = (e.name === 'AssertionError');
  }
  console.log('4. toEqual RegExp distinction:', regExpDistinguished ? 'PASSED' : 'FAILED');

  // 5. toEqual Set & Map
  let setEqual = false;
  try {
    patchedExpect(new Set([1, 2])).toEqual(new Set([2, 1]));
    setEqual = true;
  } catch {}
  console.log('5. toEqual Set deep equality:', setEqual ? 'PASSED' : 'FAILED');

  // 6. toContain prototype pollution
  let protoPollutionPrevented = false;
  try {
    patchedExpect({}).toContain('toString');
  } catch (e) {
    protoPollutionPrevented = (e.name === 'AssertionError');
  }
  console.log('6. toContain prototype pollution prevented:', protoPollutionPrevented ? 'PASSED' : 'FAILED');

  // 7. toExist on empty array
  let emptyArrayNotExist = false;
  try {
    patchedExpect([]).toExist();
  } catch (e) {
    emptyArrayNotExist = (e.name === 'AssertionError');
  }
  console.log('7. toExist fails on empty array/collection:', emptyArrayNotExist ? 'PASSED' : 'FAILED');

  // 8. toHaveTextContent on null element
  let nullTextFails = false;
  try {
    patchedExpect(null).toHaveTextContent('');
  } catch (e) {
    nullTextFails = (e.name === 'AssertionError');
  }
  console.log('8. toHaveTextContent fails on null element:', nullTextFails ? 'PASSED' : 'FAILED');

  // 9. toThrow with async function rejection
  let asyncThrowHandled = false;
  try {
    await patchedExpect(async () => {
      throw new Error('Async boom');
    }).toThrow('Async boom');
    asyncThrowHandled = true;
  } catch {}
  console.log('9. toThrow handles async rejection with await:', asyncThrowHandled ? 'PASSED' : 'FAILED');

  // 10. expect(promise).rejects.toThrow()
  let rejectsHandled = false;
  try {
    await patchedExpect(Promise.reject(new Error('Rejected error'))).rejects.toThrow('Rejected');
    rejectsHandled = true;
  } catch {}
  console.log('10. expect.rejects.toThrow():', rejectsHandled ? 'PASSED' : 'FAILED');

  console.log('\n--- VERIFYING PATCHED RUNNER ---');

  // 11. Failing beforeAll marks tests as failed
  const runner1 = new PatchedTestRunner();
  let test1Ran = false;
  runner1.describe('Failing beforeAll Suite', () => {
    runner1.beforeAll(() => {
      throw new Error('Database connection failed');
    });
    runner1.test('dependent test', () => {
      test1Ran = true;
    });
  });
  const stats1 = await runner1.run();
  const beforeAllPass = (stats1.failed > 0 && !test1Ran);
  console.log('11. beforeAll hook error fails suite & skips test:', beforeAllPass ? 'PASSED' : 'FAILED', `(failed: ${stats1.failed}, testRan: ${test1Ran})`);

  // 12. Failing beforeEach marks test as failed and stops execution
  const runner2 = new PatchedTestRunner();
  let test2Ran = false;
  runner2.describe('Failing beforeEach Suite', () => {
    runner2.beforeEach(() => {
      throw new Error('Setup failed');
    });
    runner2.test('dependent test', () => {
      test2Ran = true;
    });
  });
  const stats2 = await runner2.run();
  const beforeEachPass = (stats2.failed > 0 && !test2Ran);
  console.log('12. beforeEach hook error fails test & skips body:', beforeEachPass ? 'PASSED' : 'FAILED', `(failed: ${stats2.failed}, testRan: ${test2Ran})`);

  // 13. Nested describe tier inheritance
  const runner3 = new PatchedTestRunner({ tier: '2' });
  runner3.describe('Tier 2: Boundaries', () => {
    runner3.describe('Feature 1: Profile', () => {
      runner3.test('unprefixed boundary test', () => {});
    });
  });
  const childTest = runner3.suites[0].suites[0].tests[0];
  console.log('13. Nested suite inherits tier:', childTest.tier === '2' ? 'PASSED' : 'FAILED', `(tier: "${childTest.tier}")`);
}

runTests().catch(console.error);
