/**
 * Core Test Runner Engine
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

export class TestRunner {
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

    // Inherit tier from enclosing suite hierarchy if not specified
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

    // Execute beforeAll hooks
    let beforeAllError = null;
    for (const hook of suite.beforeAllHooks) {
      try {
        await hook();
      } catch (err) {
        beforeAllError = err;
        console.error(`Error in beforeAll hook for "${suite.name}":`, err.message || err);
        break;
      }
    }

    // If beforeAll failed, mark suite tests as failed and skip execution
    if (beforeAllError) {
      if (suite.tests.length === 0) {
        this.stats.failed++;
      } else {
        for (const testCase of suite.tests) {
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

      // Execute afterAll hooks for cleanup attempt
      for (const hook of suite.afterAllHooks) {
        try {
          await hook();
        } catch (err) {
          console.error(`Error in afterAll hook:`, err.message || err);
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
          console.error(`Error in beforeEach hook:`, err.message || err);
          break;
        }
      }

      if (beforeEachError) {
        testCase.status = 'failed';
        testCase.duration = Date.now() - testStart;
        testCase.error = new Error(`beforeEach hook failed: ${beforeEachError.message}`);
        testCase.error.stack = beforeEachError.stack;
        this.stats.failed++;

        // Execute afterEach hooks for cleanup
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
        console.error(`Error in afterAll hook:`, err.message || err);
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
