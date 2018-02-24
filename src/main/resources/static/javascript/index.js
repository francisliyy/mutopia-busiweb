;$(function(){

	$("#register_from").validate({
		debug:true,
		rules: {
	      regisetr_mobile: {
	        required: true,
	        chinaMobile: true,
	      },
	      register_msg: {
	        required: true,
	        rangelength: [6,6]
	      },
	      register_pwd: {
	        required: true,
	        minlength: 6
	      },
	      register_repwd: {
	        required: true,
	        minlength: 6,
	        equalTo: "#register_pwd"
	      },
	    },
	    messages: {
	      regisetr_mobile: {
	        required: "(请输入中国大陆手机号)",
	        chinaMobile: "(请输入11位中国大陆手机号)"
	      },
	      register_msg: {
	        required: "请输入短信验证码",
	        rangelength: "请输入6位短信验证码"
	      },
	      password: {
	        required: "请输入密码",
	        minlength: "密码长度不能小于 6 个字母"
	      },
	      confirm_password: {
	        required: "请输入密码",
	        minlength: "密码长度不能小于 6 个字母",
	        equalTo: "两次密码输入不一致"
	      }
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