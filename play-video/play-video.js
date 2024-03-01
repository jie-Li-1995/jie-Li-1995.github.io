$(function () {
  function playVideo(name = '', url) {
    if ($('#play_video').length !== 0) {
      $('#play_video h2').text(name)
      $('#play_video video').attr('src', url)
      $('#play_video').fadeIn()
    } else {
      var playVidoStr = ''
      playVidoStr += '<div id="play_video">'
      playVidoStr += '  <div class="play_video_content">'
      playVidoStr += '    <i class="play_video_close"></i>'
      playVidoStr += '    <h2 class="line_over">' + name + '</h2>'
      playVidoStr += '    <video src="' + url + '" controls=""></video>'
      playVidoStr += '  </div>'
      playVidoStr += '</div>'
      $('body').append(playVidoStr)
    }
  }

  $('body').on('click', '[play-video]', function () {
    playVideo($(this).attr('data-name'), $(this).attr('data-url'))
  })

  $('body').on('click', '#play_video .play_video_close', function () {
    $(this).siblings('video').attr('src', '')
    $(this).parent().parent().fadeOut()
  })
})
