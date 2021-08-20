/* eslint-disable */
import $ from 'jquery';

export default function selectFirstOnEnter (input) {  // store the original event binding function
  const _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;
  function addEventListenerWrapper(type, listener) {  // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected, and then trigger the original listener.
    if (type == 'keydown') {
      const orig_listener = listener;
      listener = function (event) {
        const suggestion_selected = $('.pac-item-selected').length > 0;
        if (event.which == 13 && !suggestion_selected) {
          const simulated_downarrow = $.Event('keydown', { keyCode: 40, which: 40 });
          orig_listener.apply(input, [simulated_downarrow]);
        }
        orig_listener.apply(input, [event]);
      };
    }
    _addEventListener.apply(input, [type, listener]); // add the modified listener
  }
  if (input.addEventListener) {
    input.addEventListener = addEventListenerWrapper;
  } else if (input.attachEvent) {
    input.attachEvent = addEventListenerWrapper;
  }
}