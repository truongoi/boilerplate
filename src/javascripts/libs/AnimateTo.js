import $ from 'jquery';

export default function animateTo(elm, speed = 500, offset = 0) {
  if ($(elm).length) {
    $('html,body').animate({ scrollTop: $(elm).offset().top + offset }, speed);
  }
}
