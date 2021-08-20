/* eslint-disable */
import $ from 'jquery';
import BaseModule from './BaseModule';

export default class Tab extends BaseModule {
  constructor(el, factory) {
    super(el, factory, 'Tab');

    const tabTitle = $(el).find('.tab-title');
    const tabContent = $(el).find('.tab-content');

    this.init(tabTitle, tabContent);
    this.addClickEvent(tabTitle, tabContent);
  }

  addClickEvent(tabTitle, tabContent) {
    tabTitle.on('click', '.tab-title__item', function (event) {
      event.preventDefault();

      let _this = $(this);
      let index = _this.index();
      _this.addClass('active').siblings().removeClass('active');
      tabContent.children('.tab-content__item').eq(index).addClass('active').siblings().removeClass('active');
    });
  }

  init(tabTitle, tabContent) {
    tabTitle.children('.tab-title__item').eq(0).addClass('active');
    tabContent.children('.tab-content__item').eq(0).addClass('active');
  }
}
