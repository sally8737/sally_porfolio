$(function() {
  
  // ==== navbar + maskOut ====
  function maskOut() {
    $('body').removeClass('menuOpen')
    $('.mask').fadeOut(200, function() {
      $(this).remove()
    })
  }
  $('#menu-btn').on('click', function() {
    var $body = $('body')
    if (!$body.hasClass('menuOpen')) {
      $body.addClass('menuOpen').append(
        $('<div class="mask"></div>')
          .hide()
          .fadeIn(500)
      )
    } else {
      maskOut()
    }
  })

  $(document).on('click', '.mask', function() {
    maskOut()
  })

  $('#nav li').on('click', function() {
    // console.log($(this).index());
    
    var target = $('.box').eq($(this).index()).offset().top,
    time = Math.abs($(window).scrollTop() - target) / 1000 * 400;
    // console.log(target)
    $('html,body').stop(true).animate({scrollTop:target},time < 400 ? 400 : time)
    maskOut()
  })
  var distance = 1000,//(px)
    speed = 300,//(ms)
    minSpeed = 300,//(ms)
    maxSpeed = 600,//(ms)
    rate = speed / distance,
    $sallyDiv = $('#main > .box')//視差單元. 每個切換滑動單元
  $('#nav li').click(function () { //選單控制器
    var $this = $(this)
    if ($this.children('a').hasClass('active')) return //點到同一單元時跳回, 節省效能
    $(window).off('scroll', scrollFunction); //視窗off 滚動
    $this.children('a').addClass('active').end().siblings('li').find('a').removeClass('active')
    var gotoOffsetTop = $sallyDiv.eq($this.index()).offset().top,// - $('#nav_head').height()
      bodySrcollTime = Math.abs($(window).scrollTop() - gotoOffsetTop) / rate;
      //$(window).scrollTop() -- 現在捲軸位置(現在視窗位置到網頁頂端的高度)
    $('html, body').stop(true).delay(200).animate({
      scrollTop: gotoOffsetTop  // scrollTop 要移動到那單元
    }, (bodySrcollTime < minSpeed ? minSpeed : bodySrcollTime > maxSpeed ? maxSpeed : bodySrcollTime), function () {
      $(window).on('scroll', scrollFunction);
    })
  });
  function scrollFunction() {// mouse 滾動到第幾個單元, menu 那個單元的 li 裡面A 要加 class
    var WST = $(window).scrollTop(), //現在捲軸位置(現在視窗位置到網頁頂端的高度)
      WH = $(window).innerHeight(), //瀏覽器視窗高度
      scrollNavActive = 0;
    $sallyDiv.each(function (index) {
      // 當滑鼠滑動超過那個單位的一半位置, 那個單元要套上 Active
      if (WST > $sallyDiv.eq(index).offset().top + ($sallyDiv.eq(index).outerHeight(true) / 2) - WH) {
        scrollNavActive = index
      }
    });
    $('#nav li').eq(scrollNavActive).children('a').addClass('active').end().siblings('li').find('a').removeClass('active')
  }


  // ==== END navbar + maskOut ====
  
  
  // ===== portfolio multiple modals  =====
  $(function () {
    function ModalOpen() {
      $(this).parent().next().attr('style', 'display: block;')
    }
    function ModalClose() {
      $(this).parents('.modal').attr('style', '')
    }
    $('.modal-body > img').click(function(e){
      e.stopPropagation();
    });
    //listener for buttons
    $('.modal-open').on('click', ModalOpen);
    $('.modal-content').on('click', ModalClose)

  })
  // ===== END  portfolio multiple modals  =====



})
