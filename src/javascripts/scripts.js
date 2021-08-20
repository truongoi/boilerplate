/* eslint-disable */
// Load jQuery from NPM
import $ from 'jquery';
import FastClick from 'fastclick';

import { openPopup } from './libs/Modals';
import Factory from './libs/Factory';

const ISZGlobal = window.ISZGlobal || {};

window.jQuery = $;
window.$ = $;

const moduleElements = [...document.querySelectorAll('[data-module]')];
const factory = new Factory();

function setDocHeight() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
}

window.addEventListener('resize', function () {
  setDocHeight();
});

window.addEventListener('orientationchange', function () {
  setDocHeight();
});

document.addEventListener('DOMContentLoaded', () => {
  factory.registerModules(moduleElements);
  FastClick.attach(document.body);
  window.factory = factory;
  //
  setTimeout(() => {
    document.body.classList.remove('preload');
    document.body.scrollIntoView();
    setDocHeight();
  }, 10);
  //
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      const rawElements = [m.target, ...m.addedNodes];
      let modifyElements = [];
      rawElements.forEach((e) => {
        if (e.querySelectorAll) {
          modifyElements = [...modifyElements, ...e.querySelectorAll('[data-module]')];
        }
      });
      const elements = [...rawElements, ...modifyElements].filter((e) => e.getAttribute && e.getAttribute('data-module') && !e.modules);
      factory.registerModules(elements);
    });
  });
  observer.observe(document, {
    subtree: true,
    childList: true,
  });
});

window.ISZGlobal = {
  openPopup(target) {
    openPopup(target);
  },
};
