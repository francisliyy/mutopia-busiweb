;$(function(){

	$("#register_from").validate({
		debug:true,
		rules: {
	      regisetr_mobile: {
	        required: true,
	        //chinaMobile：true,
	        minlength: 11
	      },
	      register_msg: {
	        required: true,
	        minlength: 2
	      },
	      register_pwd: {
	        required: true,
	        minlength: 5
	      },
	      register_repwd: {
	        required: true,
	        minlength: 5,
	        equalTo: "#password"
	      },
	    },
	    messages: {
	      regisetr_mobile: {
	        required: "(请输入中国大陆手机号)",
	        minlength: "(用户名必需由两个字母组成)"
	      },
	      password: {
	        required: "请输入密码",
	        minlength: "密码长度不能小于 5 个字母"
	      },
	      confirm_password: {
	        required: "请输入密码",
	        minlength: "密码长度不能小于 5 个字母",
	        equalTo: "两次密码输入不一致"
	      },
	      email: "请输入一个正确的邮箱",
	      agree: "请接受我们的声明",
	      topic: "请选择两个主题"
	     },
	     submitHandler:function(form){
            alert("submitted");   
            console.log($("#register_from").find('label'));
            $("#register_from").find('label').remove();
            //form.submit();
        },
        errorPlacement: function(error, element) {
			// Append error within linked label
			$( element )
				.closest( "form" )
					.find( "label[for='" + element.attr( "id" ) + "']" )
						.append(error.css('color', 'red'));
		},
		errorElement: "span",
    });
})