/**
 * Public Export Entrypoint for Test Suites
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

import { TestRunner } from './runner.js';
import { expect } from './assertions.js';
import { DOMEnvironment } from './dom-environment.js';
import { StaticAnalyzer } from './static-analyzer.js';
import { Reporter } from './reporter.js';

export const globalRunner = new TestRunner();

export const describe = globalRunner.describe.bind(globalRunner);
export const test = globalRunner.test.bind(globalRunner);
export const it = test;
export const beforeAll = globalRunner.beforeAll.bind(globalRunner);
export const beforeEach = globalRunner.beforeEach.bind(globalRunner);
export const afterEach = globalRunner.afterEach.bind(globalRunner);
export const afterAll = globalRunner.afterAll.bind(globalRunner);

export { expect, DOMEnvironment, StaticAnalyzer, Reporter, TestRunner };
