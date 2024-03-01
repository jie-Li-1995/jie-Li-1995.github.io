$(function () {
  var data = new Array(30).fill().map((item, index) => index + 1) // 假设这是你的数据

  // 每页显示的数量
  var showPageSize = 4
  var perPage = 5

  // 初始化分页
  var currentPage = 1
  showPage(currentPage)

  function showPage(page) {
    var startIndex = (page - 1) * perPage
    var endIndex = startIndex + perPage
    var pageData = data.slice(startIndex, endIndex)

    // 显示当前页的数据
    $('#data').empty()
    $.each(pageData, function (index, item) {
      $('#data').append('<div>' + item + '</div>')
    })

    // 更新分页按钮
    updatePagination(page)
  }

  function updatePagination(currentPage) {
    var totalPages = Math.ceil(data.length / perPage)
    var pagination = $('.pagination')
    pagination.empty()

    // 添加上一页按钮
    if (currentPage > 1) {
      pagination.append('<span href="#" class="prev">上一页</span>')
    }

    // 添加页码按钮
    var start = Math.max(currentPage - showPageSize, 1)
    for (var i = 0; i < 2 * showPageSize + 1; i++) {
      var cur = start + i
      console.log(cur, currentPage)
      if (cur === currentPage) {
        pagination.append('<span class="active">' + cur + '</span>')
      } else if (cur <= totalPages) {
        pagination.append('<span>' + cur + '</span>')
      }
    }

    // 添加下一页按钮
    if (currentPage < totalPages) {
      pagination.append('<span class="next">下一页</span>')
    }
  }

  // 绑定页码点击事件
  $('.pagination').on('click', 'span', function () {
    var page = $(this).text() - 0
    if ($(this).hasClass('prev')) {
      currentPage--
    } else if ($(this).hasClass('next')) {
      currentPage++
    } else {
      currentPage = page
    }
    showPage(currentPage)
  })
})
