import BaseModule from './BaseModule';

export default class Sample extends BaseModule {
  constructor(el, factory) {
    super(el, factory, 'Sample');
    this.register();
  }

  register() {
    this.log = console.warn('This is a sample js file. Used as a template.');
  }
}
