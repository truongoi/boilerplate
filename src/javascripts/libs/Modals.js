/* eslint-disable */
import $ from 'jquery';

export function openPopup(target) {
  $.magnificPopup.open({
    items: {
      src: target,
    },
    type: 'inline',
    preloader: false,
    mainClass: 'my-mfp-zoom-in',
    closeOnBgClick: false,
    enableEscapeKey: false,
  });
}
