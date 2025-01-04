// composer char counter code
console.log('composer-char-counter.js is loaded!');

$(document).ready(function () {
  $('.new-tweet textarea').on('input', function () {
    const maxChars = 140;
    const textLength = $(this).val().length;
    const remainingChars = maxChars - textLength;

    
    const counterElement = $(this).closest('div').find('.counter');
    counterElement.text(remainingChars); 

    
    if (remainingChars < 0) {
      counterElement.addClass('red');
    } else {
      counterElement.removeClass('red');
    }
  });
});

