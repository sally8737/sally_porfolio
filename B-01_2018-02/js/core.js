$(function() {
  // ======= header & footer =======

  $.ajax({
    url: 'common.html',
    dataType: 'html'
  }).done(function(data) {
    $('#footer').html(
      $('<div>' + data + '</div>')
        .find('#footer')
        .html()
    )
    $('#header').html(
      $('<div>' + data + '</div>')
        .find('#header')
        .html()
    )

    $('.nav')
      .find('a')
      .on('mouseenter mouseleave', function() {
        var temp = $(this).text()
        $(this).text($(this).data('english'))
        $(this).data('english', temp)
      })

    var sallyWebUrl = location.href,
      sallyWebHref = sallyWebUrl.substr(sallyWebUrl.lastIndexOf('/') + 1)
    $('#header>.nav a[href="' + sallyWebHref + '"]').addClass('selected')
  })
  // ======= End header & footer =======

  // ======= CH/EN Switch : contact-bar  =======
  $('.contact-bar, .contact-bar-home')
    .find('a')
    .on('mouseenter mouseleave', function() {
      var temp = $(this).text()
      $(this).text($(this).data('english'))
      $(this).data('english', temp)
    })
  // ======= End CH/EN Switch =======

  // ======= positionWalterFull =======

  var columnWidth = 400
  var windowWidth = 1048

  var $items = $('.item')
    .each(function() {
      $(this).css({
        width: 100 + '%',
        height: 0,
        paddingTop: ($(this).data('height') / $(this).data('width')) * 100 + '%'
      })
    })
    .remove()

  $('.column')
    .on('resize', function() {
      $('.column').remove()
      var num = Math.ceil(windowWidth / columnWidth)
      while (num--) {
        $('.content-2').append('<div class="column"></div>')
      }
      $('.column').css({ width: 100 / $('.column').length + '%' })
      $items.each(function() {
        var $column = $('.column').sort(function(a, b) {
          return $(a).height() - $(b).height()
        })
        $(this).appendTo($column.eq(0))
      })
    })
    .resize()

  // ======= End positionWalterFull =======

  // ======= slideShow =======
  $.getJSON('data.json', function(data) {
    var html = ''
    var circle = ''
    for (var i = 0; i < data.length; i++) {
      html += '<div>'
      html +=
        '<a href="' +
        data[i][1] +
        '" target="_black"><img src= "' +
        data[i][0] +
        '"></a>'
      html += '</div>'
      circle += '<span'
      if (i == 0) {
        circle += ' class="active"'
      }
      circle += '></span>'
    }
    $('.inbox').html(html)
    $('.circle').html(circle)
    $('.inbox > div')
      .first()
      .clone()
      .appendTo($('.inbox'))

    var index = 0
    // $('.inbox').style.cssText = "width: data.length * 100%;"
    function run() {
      if (!$('.inbox').is(':animated')) {
        $('.inbox').animate({ left: '-=1048' }, function() {
          if (index >= data.length - 1) {
            index = -1
            $(this).css('left', 0)
          }
          index++
          dot()
        })
      }
    }
    var sid = setInterval(run, 3000)
    $('.inbox, .circle, .prev, .next').hover(
      function() {
        clearInterval(sid)
      },
      function() {
        sid = setInterval(run, 3000)
      }
    )

    function back() {
      if (!$('.inbox').is(':animated')) {
        if (index <= 0) {
          index = data.length
          $('.inbox').css('left', index * -1048)
        }
        $('.inbox').animate({ left: '+=1048' }, function() {
          index--
          dot()
        })
      }
    }

    function dot() {
      $('.circle >span.active').removeClass()
      $('.circle >span')
        .eq(index)
        .addClass('active')
    }
    $('.next').click(run)
    $('.prev').click(back)
    $('.circle >span').click(function() {
      index = $(this).index()
      $('.inbox').animate({ left: index * -1048 }, dot)
    })
  })
  // ======= End slideShow =======
})
