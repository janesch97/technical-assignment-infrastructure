class MiddlewareLayer {
  #stack;

  constructor() {
    this.#stack = [];
  }

  register(middleware) {
    if (typeof middleware !== 'function') {
      throw new TypeError('Middleware must be a function');
    }
    this.#stack.push(middleware);
  }

  run(req, res) {
    let prevIndex = -1;

    const runner = (index) => {
      if (index === prevIndex) {
        console.error(new Error('next() already called'));
        return;
      }

      prevIndex = index;

      const middlewareFn = this.#stack[index];

      if (middlewareFn) {
        middlewareFn(req, res, () => runner(index + 1));
      }
    };

    runner(0);
  }
}

module.exports = MiddlewareLayer;
