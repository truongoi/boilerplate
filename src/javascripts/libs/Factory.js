/* eslint-disable */
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';

    if (search instanceof RegExp) {
      throw TypeError('first argument must not be a RegExp');
    }
    if (start === undefined) { start = 0; }
    return this.indexOf(search, start) !== -1;
  };
}

export default class Factory {
  constructor() {
    this.modules = {};
    this.names = {};
    this.elements = new WeakMap();
  }

  registerModules(elements) {
    elements.forEach((el) => {
      if (el.modules) return;
      const modules = el.getAttribute('data-module') ? el.getAttribute('data-module').split(/(\s|,)/g).filter((s) => s.trim().length && !s.includes(',')) : [];
      modules.forEach((m) => {
        // eslint-disable-next-line max-len
        this.addModule(new (require(`../modules/${m}`).default)(el, this)); // eslint-disable-line import/no-dynamic-require, global-require, new-cap
      });
    });
  }

  addModule(m) {
    this.modules[m.id] = m;
    if (!this.names[m.name]) {
      this.names[m.name] = [];
    }
    this.names[m.name].push(m);
    if (!this.elements.has(m.el)) {
      const newModule = {
        [m.name]: m,
      };
      this.elements.set(m.el, newModule);
      return m;
    }
    const eleModules = this.elements.get(m.el);
    return eleModules[m.name] = m; // eslint-disable-line no-return-assign
  }

  getModuleById(id) {
    return this.modules[id];
  }

  getModulesByEl(el) {
    return this.elements.get(el);
  }

  getModulesByName(name) {
    return this.names[name];
  }
}
