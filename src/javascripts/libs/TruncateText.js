import $ from 'jquery';

export default function truncateText(items) {
  function init(elm) {
    const thisElm = $(elm);
    const maxLength = Number(thisElm.attr('data-truncate'));
    const textLength = thisElm.text().length;
    const str = thisElm.text().substr(0, maxLength);
    const lastIndexOf = str.lastIndexOf(' ');

    if (textLength > maxLength) {
      thisElm.attr('data-original-text', thisElm.text());
      thisElm.text(`${str.substr(0, lastIndexOf)}…`);
    }
  }

  function clear(elm) {
    const thisElm = $(elm);
    thisElm.text(thisElm.attr('data-original-text'));
  }

  $(window).on('resize', function () {
    $(items).each(function (idx, elm) {
      if ($(window).width() < 768 && $(elm).attr('data-truncate-viewport') === 'mobile') {
        init(elm);
      } else if ($(window).width() >= 768 && $(elm).attr('data-truncate-viewport') === 'desktop') {
        init(elm);
      } else if ($(elm).attr('data-truncate-viewport') === undefined) {
        init(elm);
      } else {
        clear(elm);
      }
    });
  }).trigger('resize');
}
