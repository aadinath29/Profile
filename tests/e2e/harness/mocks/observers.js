/**
 * IntersectionObserver & ResizeObserver Mocks
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

export function createObserverMocks() {
  class MockIntersectionObserver {
    constructor(callback, options = {}) {
      this.callback = callback;
      this.options = options;
      this.elements = new Set();
    }

    observe(element) {
      if (!element) return;
      this.elements.add(element);
      // Synchronously fire intersection notification for automated tests
      if (typeof this.callback === 'function') {
        try {
          this.callback(
            [
              {
                target: element,
                isIntersecting: true,
                intersectionRatio: 1.0,
                boundingClientRect: element.getBoundingClientRect ? element.getBoundingClientRect() : { top: 0, bottom: 500, width: 800, height: 500 }
              }
            ],
            this
          );
        } catch {
          // Swallow any callback errors during initial mount
        }
      }
    }

    unobserve(element) {
      this.elements.delete(element);
    }

    disconnect() {
      this.elements.clear();
    }
  }

  class MockResizeObserver {
    constructor(callback) {
      this.callback = callback;
      this.elements = new Set();
    }

    observe(element) {
      if (!element) return;
      this.elements.add(element);
      if (typeof this.callback === 'function') {
        try {
          this.callback(
            [
              {
                target: element,
                contentRect: { width: 1280, height: 800 }
              }
            ],
            this
          );
        } catch {
          // Swallow callback error
        }
      }
    }

    unobserve(element) {
      this.elements.delete(element);
    }

    disconnect() {
      this.elements.clear();
    }
  }

  return {
    IntersectionObserver: MockIntersectionObserver,
    ResizeObserver: MockResizeObserver
  };
}
