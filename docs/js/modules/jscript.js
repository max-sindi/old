$(document).ready(function(){
    $("#dropdown-nav-button").click(function() {
        $("#nav-menu").toggleClass('display-block');
    });
    $("#main-top-carousel").owlCarousel({
        singleItem : true,
        autoPlay : 3000
    });
    $(".spec-carousel").owlCarousel({
        itemsCustom : [ [0, 1],
                        [690, 2],
                        [(362 * 3 + 60), 3], ],
        navigation	: true,
        navigationText : ['<span class="spec-arrow-left  spec-arrow" aria-hidden="true"><span>', 
                          '<span class="spec-arrow-right  spec-arrow" aria-hidden="true"></span>']
    });
    $(".service-carousel").owlCarousel({
        itemsCustom : [ [0, 1],
                        [600, 2] ],
        navigation	: true,
        navigationText : ['<span class="spec-arrow-left  spec-arrow" aria-hidden="true"><span>', 
                          '<span class="spec-arrow-right  spec-arrow" aria-hidden="true"></span>']
    });
    $('.comments-carousel').owlCarousel({
        singleItem : true,
        navigation	: true,
        navigationText : ['<span class="spec-arrow-left  spec-arrow" aria-hidden="true"><span>', 
                          '<span class="spec-arrow-right  spec-arrow" aria-hidden="true"></span>']
    });
    $('#languages-carousel').owlCarousel({
        wid : 130,
        itemsCustom : [ [0, 1],
                        [( (130*2) + 140), 2],
                        [( (130*4) + 140 ), 4],
                        [( (130*8) + 140 ), 8],
                        [( (130*12) + 140 ), 12] ],
        items: 12,
        navigation	: true,
        navigationText : ['<span class="spec-arrow-left  spec-arrow" aria-hidden="true"><span>', 
                          '<span class="spec-arrow-right  spec-arrow" aria-hidden="true"></span>']
    });
    var fileSelect = $(".rate-file-input");
    var rateSelect = $('select.rate-element');
    setTimeout(function() {
        fileSelect.styler();
        rateSelect.styler();
    }, 100);
    
    $('.header-nav-item').hover(function() {
       $(this).find('.dropdown-menu').fadeToggle(100);
    });

    /*answers-question.html => category-questions buttons */
    $('.question-category').find('.item').click(function (event) {
      event.preventDefault();
    });
    
    /*answers-question.html => answers deploys on click */
    $('.questions .switch').click( function() {
      $(this).parent().siblings('.inside').slideToggle('300');
    } );

    /*comments.html => input-range with jQuery UI plugin*/
    $("#slider").slider({
        min: 0,
        max: 10,
        value: 8.6,
        range: "min",
        step: 0.1,
        animate: "normal",
        orientation: "horizontal",
        slide: function(event, ui) {
          $("#total").val($(this).slider("value"));
          var a = $('#slider').slider("value");
          $('#total').attr('value', a);
        },
        stop: function(event, ui) {
          $("#total").val($(this).slider("value"));
          var a = $('#slider').slider("value");
          $('#total').attr('value', a);
        }
    });
    $('#total').change( function() {
      var value = $('#total').val();
      var valueArr = value.split('');

      // verify and customize if it needs
      for (var i = 0; i < valueArr.length; i++) {
        var a = valueArr[i];
        if (a == ',' || a == '.') {
          valueArr[i] = '.';
          valueArr.length = i+2;
          break;
        };
        if (isNaN(a) || (a == ' ')) {
          valueArr.splice(i, 1);
          i--;
        }
      }
      value = valueArr.join('');

      if ( value > 10 ) { value = 10};
      if( value < 0 ) { value = 0};
      console.log(value);
      $('#slider').slider("value", value);
      $('#total').attr('value', value);
      $('#total').val(value);
    } );

    $('#range-cont').click(function(event) {
      var range = $(this).parent().find('.dropped-range-wp');
      if( range.is(':hidden') ) {
        range.fadeIn('100');
        range.focus();
      } else {
        range.fadeOut('100')
      }
    });

});

