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

    $('#msg-btn').on('click', function(event) {
    	event.preventDefault();
    	var isValid = $("#register_from").validate().element("#regisetr_mobile");
    	if(isValid){
    		$.ajax({
	    		url: SysMgt_Path + '/user/smsRegister/'+$("#regisetr_mobile").val(),
	    		type: 'GET'
	    	})
	    	.done(function(result) {
	    		if(result==="1"){
	    			$("#validate_label" ).html("短信已发送，请查收！");
	    			var timesRun = 60;
					var interval = setInterval(function(){
						timesRun -= 1;
						$("#msg-btn").removeClass('btn-info');
						$("#msg-btn").addClass('btn-blue-grey');
						$("#msg-btn").prop('disabled', true);
						$("#msg-btn").text("获取验证码("+timesRun+")")
						if(timesRun === 0){
							$("#msg-btn").prop('disabled', false);
							$("#msg-btn").removeClass('btn-blue-grey');
							$("#msg-btn").addClass('btn-info');	
							$("#msg-btn").text("获取验证码");					
							clearInterval(interval);
						}						
					}, 1000);
	    		}else{
	    			console.log($("#validate_label" ).html());
	    			$("#validate_label" ).html(result);
	    		}    		
	    	})
    	}
    });

    $("#register-btn").on('click', function(event) {
    	$("#register_error li").remove();
    	event.preventDefault();
    	var param = {"mobile": $("#regisetr_mobile").val(),
    			   "verifycode": $("#register_msg").val(),
    			   "password": $("#register_pwd").val()};
    	$.ajax({
    		url: SysMgt_Path + '/user/initCreationFormByMobile',
    		type: 'POST',
    		contentType : "application/json",
    		data: JSON.stringify(param),
    	})
    	.done(function(result) {
    		typeof result === 'string' && $("#register_error").html(result);
    	}).fail(function(error) {
    		console.log(error);
    		if(error&&error.responseJSON){
    			$("#register_error").append("<li>"+error.responseJSON.errorMessage+"</li>");
    		}
    	});
    	
    });
});