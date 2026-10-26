/**
 * Headless Virtual DOM Environment & Browser API Shims
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

import { LocalStorageMock } from './mocks/localstorage.js';
import { createObserverMocks } from './mocks/observers.js';
import { createEmailJSMock } from './mocks/emailjs.js';

export class DOMEnvironment {
  constructor() {
    this.window = null;
    this.document = null;
    this.localStorage = new LocalStorageMock();
    this.currentViewport = { width: 1280, height: 800 };
    this.mediaListeners = new Set();
    this.rafCallbacks = new Map();
    this.rafId = 0;
    this.currentTime = 0;
    this.emailJSMock = createEmailJSMock();
  }

  async setup(htmlContent = '<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>') {
    let JSDOMModule = null;
    try {
      const imported = await import('jsdom');
      JSDOMModule = imported.JSDOM;
    } catch {
      JSDOMModule = null;
    }

    if (JSDOMModule) {
      const dom = new JSDOMModule(htmlContent, {
        url: 'http://localhost:5173/',
        pretendToBeVisual: true,
        runScripts: 'dangerously'
      });
      this.window = dom.window;
      this.document = dom.window.document;
    } else {
      this._setupMinimalDOM(htmlContent);
    }

    this._installShims();
  }

  _installShims() {
    const win = this.window;
    if (!win) return;

    // LocalStorage
    try {
      Object.defineProperty(win, 'localStorage', {
        value: this.localStorage,
        writable: true,
        configurable: true
      });
    } catch {
      win.localStorage = this.localStorage;
    }

    // matchMedia shim
    win.matchMedia = (query) => {
      const matches = this._evaluateMediaQuery(query, this.currentViewport.width);
      const mql = {
        matches,
        media: query,
        onchange: null,
        addListener: (cb) => this.mediaListeners.add({ query, cb }),
        removeListener: (cb) => {
          for (const item of this.mediaListeners) {
            if (item.cb === cb) this.mediaListeners.delete(item);
          }
        },
        addEventListener: (event, cb) => this.mediaListeners.add({ query, cb }),
        removeEventListener: (event, cb) => {
          for (const item of this.mediaListeners) {
            if (item.cb === cb) this.mediaListeners.delete(item);
          }
        },
        dispatchEvent: () => true
      };
      return mql;
    };

    // RAF & Performance
    win.requestAnimationFrame = (callback) => {
      const id = ++this.rafId;
      this.rafCallbacks.set(id, callback);
      return id;
    };
    win.cancelAnimationFrame = (id) => {
      this.rafCallbacks.delete(id);
    };
    win.performance = win.performance || { now: () => this.currentTime };

    // ScrollTo & ScrollX/Y
    win.scrollX = 0;
    win.scrollY = 0;
    win.scrollTo = (x, y) => {
      win.scrollX = typeof x === 'object' ? x.left || 0 : x || 0;
      win.scrollY = typeof x === 'object' ? x.top || 0 : y || 0;
    };

    // WebGL Canvas Shim for Three.js / R3F
    if (win.HTMLCanvasElement) {
      win.HTMLCanvasElement.prototype.getContext = function (contextType) {
        if (contextType === 'webgl' || contextType === 'webgl2' || contextType === 'experimental-webgl') {
          return {
            canvas: this,
            drawingBufferWidth: 800,
            drawingBufferHeight: 600,
            viewport: () => {},
            clearColor: () => {},
            clear: () => {},
            enable: () => {},
            disable: () => {},
            createShader: () => ({}),
            shaderSource: () => {},
            compileShader: () => {},
            getShaderParameter: () => true,
            getShaderInfoLog: () => '',
            createProgram: () => ({}),
            attachShader: () => {},
            linkProgram: () => {},
            getProgramParameter: () => true,
            getProgramInfoLog: () => '',
            useProgram: () => {},
            createBuffer: () => ({}),
            bindBuffer: () => {},
            bufferData: () => {},
            createTexture: () => ({}),
            bindTexture: () => {},
            texParameteri: () => {},
            texImage2D: () => {},
            getExtension: () => null,
            getParameter: () => 16,
            drawArrays: () => {},
            drawElements: () => {}
          };
        }
        if (contextType === '2d') {
          return {
            fillRect: () => {},
            clearRect: () => {},
            getImageData: () => ({ data: new Uint8Array(4) }),
            putImageData: () => {},
            createImageData: () => [],
            setTransform: () => {},
            drawImage: () => {},
            save: () => {},
            fillText: () => {},
            restore: () => {},
            beginPath: () => {},
            moveTo: () => {},
            lineTo: () => {},
            closePath: () => {},
            stroke: () => {},
            fill: () => {}
          };
        }
        return null;
      };
    }

    // Observers
    const observers = createObserverMocks();
    win.IntersectionObserver = observers.IntersectionObserver;
    win.ResizeObserver = observers.ResizeObserver;

    // EmailJS
    this.emailJSMock = createEmailJSMock();

    // Assign onto global scope for libraries accessing global window
    global.window = win;
    global.document = win.document;

    // Node 21+ safe navigator definition (global.navigator has only a getter by default)
    this._originalNavigatorDescriptor = Object.getOwnPropertyDescriptor(global, 'navigator') || null;
    try {
      Object.defineProperty(global, 'navigator', {
        value: win.navigator,
        writable: true,
        configurable: true,
        enumerable: true
      });
    } catch {
      try {
        global.navigator = win.navigator;
      } catch {
        // Fallback for restricted runtimes
      }
    }

    global.localStorage = this.localStorage;
    global.matchMedia = win.matchMedia;
    global.requestAnimationFrame = win.requestAnimationFrame;
    global.cancelAnimationFrame = win.cancelAnimationFrame;
    global.IntersectionObserver = win.IntersectionObserver;
    global.ResizeObserver = win.ResizeObserver;
  }

  _evaluateMediaQuery(query, width) {
    const maxMatch = query.match(/max-width:\s*(\d+)px/);
    if (maxMatch) {
      const maxVal = parseInt(maxMatch[1], 10);
      if (width > maxVal) return false;
    }
    const minMatch = query.match(/min-width:\s*(\d+)px/);
    if (minMatch) {
      const minVal = parseInt(minMatch[1], 10);
      if (width < minVal) return false;
    }
    if (maxMatch || minMatch) return true;

    if (query.includes('pointer: coarse')) return width < 768;
    if (query.includes('pointer: fine')) return width >= 768;
    if (query.includes('prefers-color-scheme: dark')) return true;
    if (query.includes('prefers-color-scheme: light')) return false;
    return false;
  }

  setViewportWidth(width, height = 800) {
    this.currentViewport = { width, height };
    if (this.window) {
      this.window.innerWidth = width;
      this.window.innerHeight = height;
    }
    for (const item of this.mediaListeners) {
      const matches = this._evaluateMediaQuery(item.query, width);
      if (typeof item.cb === 'function') {
        item.cb({ matches, media: item.query });
      }
    }
  }

  advanceTime(ms) {
    this.currentTime += ms;
    const callbacks = Array.from(this.rafCallbacks.values());
    this.rafCallbacks.clear();
    for (const cb of callbacks) {
      try {
        cb(this.currentTime);
      } catch {
        // Continue advancing
      }
    }
  }

  teardown() {
    try { delete global.window; } catch {}
    try { delete global.document; } catch {}

    // Restore original Node navigator getter or delete override
    if (this._originalNavigatorDescriptor) {
      try {
        Object.defineProperty(global, 'navigator', this._originalNavigatorDescriptor);
      } catch {
        try { delete global.navigator; } catch {}
      }
    } else {
      try { delete global.navigator; } catch {}
    }

    try { delete global.localStorage; } catch {}
    try { delete global.matchMedia; } catch {}
    try { delete global.requestAnimationFrame; } catch {}
    try { delete global.cancelAnimationFrame; } catch {}
    try { delete global.IntersectionObserver; } catch {}
    try { delete global.ResizeObserver; } catch {}
  }

  _setupMinimalDOM(htmlContent) {
    class MockClassList {
      constructor() {
        this._classes = new Set();
      }
      add(...tokens) {
        tokens.forEach((t) => this._classes.add(t));
      }
      remove(...tokens) {
        tokens.forEach((t) => this._classes.delete(t));
      }
      toggle(token, force) {
        if (force !== undefined) {
          if (force) this._classes.add(token);
          else this._classes.delete(token);
          return force;
        }
        if (this._classes.has(token)) {
          this._classes.delete(token);
          return false;
        }
        this._classes.add(token);
        return true;
      }
      contains(token) {
        return this._classes.has(token);
      }
      [Symbol.iterator]() {
        return this._classes.values();
      }
    }

    class MockElement {
      constructor(tag = 'div') {
        this.tagName = tag.toUpperCase();
        this.nodeName = this.tagName;
        this.classList = new MockClassList();
        this.attributes = new Map();
        this.children = [];
        this.style = {};
        this.textContent = '';
        this.innerHTML = '';
      }
      setAttribute(name, val) {
        this.attributes.set(name, String(val));
        if (name === 'class') {
          this.classList = new MockClassList();
          String(val).split(/\s+/).filter(Boolean).forEach((c) => this.classList.add(c));
        }
      }
      getAttribute(name) {
        return this.attributes.has(name) ? this.attributes.get(name) : null;
      }
      hasAttribute(name) {
        return this.attributes.has(name);
      }
      removeAttribute(name) {
        this.attributes.delete(name);
      }
      appendChild(child) {
        this.children.push(child);
        return child;
      }
      querySelector() {
        return null;
      }
      querySelectorAll() {
        return [];
      }
      getBoundingClientRect() {
        return { top: 0, bottom: 600, left: 0, right: 800, width: 800, height: 600 };
      }
    }

    const docElement = new MockElement('html');
    const head = new MockElement('head');
    const body = new MockElement('body');
    docElement.appendChild(head);
    docElement.appendChild(body);

    class MockCanvasElement extends MockElement {
      constructor() {
        super('canvas');
        this.width = 800;
        this.height = 600;
      }
      getContext(type) {
        if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') {
          return {
            canvas: this,
            drawingBufferWidth: 800,
            drawingBufferHeight: 600,
            COLOR_BUFFER_BIT: 0x00004000,
            DEPTH_BUFFER_BIT: 0x00000100,
            STENCIL_BUFFER_BIT: 0x00000400,
            TRIANGLES: 0x0004,
            STATIC_DRAW: 0x88e4,
            DYNAMIC_DRAW: 0x88e8,
            ARRAY_BUFFER: 0x8892,
            ELEMENT_ARRAY_BUFFER: 0x8893,
            FLOAT: 0x1406,
            VERTEX_SHADER: 0x8b31,
            FRAGMENT_SHADER: 0x8b30,
            COMPILE_STATUS: 0x8b81,
            LINK_STATUS: 0x8b82,
            viewport: () => {},
            clearColor: () => {},
            clear: () => {},
            enable: () => {},
            disable: () => {},
            createShader: () => ({}),
            shaderSource: () => {},
            compileShader: () => {},
            getShaderParameter: () => true,
            getShaderInfoLog: () => '',
            createProgram: () => ({}),
            attachShader: () => {},
            linkProgram: () => {},
            getProgramParameter: () => true,
            getProgramInfoLog: () => '',
            useProgram: () => {},
            createBuffer: () => ({}),
            bindBuffer: () => {},
            bufferData: () => {},
            createTexture: () => ({}),
            bindTexture: () => {},
            texParameteri: () => {},
            texImage2D: () => {},
            getExtension: () => null,
            getParameter: () => 16,
            drawArrays: () => {},
            drawElements: () => {}
          };
        }
        if (type === '2d') {
          return {
            fillRect: () => {},
            clearRect: () => {},
            getImageData: () => ({ data: new Uint8Array(4) }),
            putImageData: () => {},
            createImageData: () => [],
            setTransform: () => {},
            drawImage: () => {},
            save: () => {},
            fillText: () => {},
            restore: () => {},
            beginPath: () => {},
            moveTo: () => {},
            lineTo: () => {},
            closePath: () => {},
            stroke: () => {},
            fill: () => {}
          };
        }
        return null;
      }
    }

    const doc = {
      documentElement: docElement,
      head,
      body,
      title: 'Aadinath Magar | Portfolio',
      getElementById: () => null,
      querySelector: (sel) => {
        if (sel === 'html') return docElement;
        if (sel === 'body') return body;
        if (sel === 'head') return head;
        return null;
      },
      querySelectorAll: () => [],
      createElement: (tag) => {
        if (tag && tag.toLowerCase() === 'canvas') {
          return new MockCanvasElement();
        }
        return new MockElement(tag);
      }
    };

    this.window = {
      document: doc,
      navigator: { userAgent: 'Node-E2E-Harness' },
      location: { pathname: '/', href: 'http://localhost:5173/' },
      innerWidth: 1280,
      innerHeight: 800,
      scrollX: 0,
      scrollY: 0,
      getComputedStyle: () => ({
        getPropertyValue: () => '',
        display: 'block',
        fontFamily: 'Inter, sans-serif'
      })
    };
    this.document = doc;
  }
}
