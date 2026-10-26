/**
 * Fluent Assertion Library for E2E Testing
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

export class AssertionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AssertionError';
  }
}

/**
 * Cycle-safe value serializer that prevents JSON.stringify crashes in error messages
 */
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

/**
 * Robust recursive deep equality comparison
 */
export function deepEqual(a, b, seen = new Map()) {
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

export function expect(actual) {
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
      negatedMessage: `Expected value not to be undefined`
    })),

    toBeUndefined: createMatcher((act) => ({
      pass: act === undefined,
      message: `Expected value to be undefined, received ${safeStringify(act)}`,
      negatedMessage: `Expected value not to be undefined`
    })),

    toContain: createMatcher((act, item) => {
      let pass = false;
      if (typeof act === 'string') {
        pass = act.includes(item);
      } else if (Array.isArray(act)) {
        pass = act.includes(item);
      } else if (act instanceof Set || act instanceof Map) {
        pass = act.has(item);
      } else if (act && typeof act === 'object') {
        pass = Object.prototype.hasOwnProperty.call(act, item);
      }
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
                const rejectedExpect = expect(rejectionErr);
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
              return expect(val)[matcherName](...args);
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
