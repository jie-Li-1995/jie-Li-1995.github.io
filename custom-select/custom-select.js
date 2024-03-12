$(function () {
  $('.selected').click(function () {
    $('.options').not($(this).next('.options')).slideUp()
    $(this).next('.options').slideToggle()
  })

  $('.options li').click(function () {
    var value = $(this).attr('data-value')
    var text = $(this).text()
    var dropdown = $(this).parents('.custom-select')
    dropdown.find('.selected').text(text)
    dropdown.find('.selected').attr('data-value', value)
    dropdown.find('.options').slideUp()
  })

  $(document).click(function (e) {
    if (!$(e.target).parent('.custom-select').length) {
      $('.options').slideUp()
    }
  })
})
