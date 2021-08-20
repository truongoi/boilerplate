/* eslint-disable */
import $ from 'jquery';
import magnificPopup from 'magnific-popup';
import truncateText from '../libs/TruncateText';
import BaseModule from './BaseModule';

export default class Global extends BaseModule {
  constructor(el, factory) {
    super(el, factory, 'Global');

    if ($('.popup-open').length) {
      this.initPopupGeneral('.popup-open');
    }

    if ($('.popup-image').length) {
      this.initPopupImage('.popup-image');
    }

    if ($('.popup-video').length) {
      this.initPopupVideo('.popup-video');
    }

    if ($('[data-truncate]').length) {
      truncateText('[data-truncate]');
    }
  }

  initPopupGeneral(items) {
    $(items).magnificPopup({
      type: 'inline',
      preloader: false,
      mainClass: 'my-mfp-zoom-in',
      closeOnBgClick: false,
      enableEscapeKey: false,
    });
  }

  initPopupImage(items) {
    $(items).magnificPopup({
      type: 'image',
      overflowY: 'hidden',
      tLoading: 'Loading image...',
      mainClass: 'my-mfp-zoom-in',
      image: {
        tError: 'The image could not be loaded.',
      }
		});
  }

  initPopupVideo(items) {
    setTimeout(() => {
      $(items).magnificPopup({
        type: 'iframe',
        overflowY: 'hidden',
        mainClass: 'my-mfp-zoom-in',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: true,
        iframe: {
          markup: '<div class="mfp-close">×</div>' +
                  '<div class="mfp-iframe-scaler">'+
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                  '</div>',
          srcAction: 'iframe_src',
        },
      });
    }, 1000);
  }
}
