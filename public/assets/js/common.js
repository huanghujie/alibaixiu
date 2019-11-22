// 退出登录功能函数
$('#logout').on('click', function () {
    var isSure = confirm('您确定要退出吗？');
    if (isSure) {
      $.ajax({
        type: 'post',
        url: '/logout',
        success: function () {
          location.href = 'login.html'
        },
        error: function () {
          alert('退出失败');
        }
      })
    }
  })