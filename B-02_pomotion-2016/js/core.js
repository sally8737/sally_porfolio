$(function(){
  
  // ======= goTop =======
  $(window).scroll(function() {
    var h = $(window).scrollTop() //取得捲動的距離(與top的距離)
    if (h > 100) {
      $('.goTop').css('display', 'block')
    } //如果距離大於100時 將goTop這個改為 display: block
    else {
      $('.goTop').css('display', 'none')
    } //否則，小於100時，display: none
  })

  $.extend($.easing, {
    easeOutExpo: function(x, t, b, c, d) {
      return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b
    }
  }) //捲動效果的程式碼

  $('.goTop').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 1000, 'easeOutExpo')
  })
  //  點擊goTop之後,回到0的位置
  // ======= End goTop =======


  // ======= positionWalterFull =======
  var columnWidth = 350
  var $items = $('.item')
    .each(function() {
      $(this).css({
        width: 100 + '%',
        height: 0,
        paddingTop: ($(this).data('height') / $(this).data('width')) * 100 + '%'
      })
    }).remove()

  $(window)
    .on('resize', function() {
      $('.column').remove()
      var num = Math.ceil($(window).width() / columnWidth)
      while (num--) {
        $('.customer-foto').append('<div class="column"></div>')
      }
      $('.column').css({ width: 100 / $('.column').length + '%' })
      $items.each(function() {
        var $column = $('.column').sort(function(a, b) {
          return $(a).height() - $(b).height()
        })
        $(this).appendTo($column.eq(0))
      })
    }).resize()

  // ======= End positionWalterFull =======

  //-- Initialize Swiper --
 
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
})