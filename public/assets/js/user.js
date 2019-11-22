// 添加用户表单提交
$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            location.reload();
        },
        error: function () {
            alert('出现错误');
        }
    })
    return false;
})
// 文件上传
$('#avatar').on('change', function () {
    // 二进制文件上传
    var formData = new FormData();
    // 添加属性
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax不要解析请求参数
        processData: false,
        // 告诉$.ajax不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response);
            $('#preview').attr('src', response[0].avatar);
            $('#avatarHidden').val(response[0].avatar);
        }

    })

})
//   显示列表
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        var html = template('userTpl', { data: response });
        // console.log(html);
        $('#userBox').html(html);

    }
})
// 编辑
$('#userBox').on('click','.edit',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(response){
            // console.log(response);  
           var html =template('modifyTpl',response);
           $('#modifyUser').html(html);
        }
    })
})
// 确认修改提交
$('#modifyUser').on('submit','#modifyForm',function(){
  var formData = $(this).serialize();
  var id= $('#modifyForm').attr('data-id');
  $.ajax({
      type:'put',
      url:'/users/'+id,
      data:formData,
      success:function(response){
      // 重新获得数据 刷新页面
       location.reload();
      }
  })
  return false;
})
