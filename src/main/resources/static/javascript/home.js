;$(function(){

	function retrieveJwtToken(loginData,isReg){
		console.log(JSON.stringify(loginData));
		$.ajax({
            url: SysMgt_Path + "/auth",
            type: "POST",
            data: JSON.stringify(loginData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                setJwtToken(data.token);
                //$login.hide();
                //$notLoggedIn.hide();
                //showTokenInformation();
                showUserInformation();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 401) {
                	if(isReg){//register
                		$('#register_error')
                			.empty()
	                        .html("<p>注册异常:<br>应用暂时无法访问</p>");
                	}else{//log in

                	}
                    
                } else {
                    throw new Error("an unexpected error occured: " + errorThrown);
                }
            }
        });
	}

	function showUserInformation() {
        $.ajax({
            url: SysMgt_Path + "/user/fromtoken",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: createAuthorizationTokenHeader(),
            success: function (data, textStatus, jqXHR) {
            	console.log(data);
                /*var $userInfoBody = $userInfo.find("#userInfoBody");

                $userInfoBody.append($("<div>").text("Username: " + data.username));
                $userInfoBody.append($("<div>").text("Email: " + data.email));

                var $authorityList = $("<ul>");
                data.authorities.forEach(function (authorityItem) {
                    $authorityList.append($("<li>").text(authorityItem.authority));
                });
                var $authorities = $("<div>").text("Authorities:");
                $authorities.append($authorityList);

                $userInfoBody.append($authorities);
                $userInfo.show();*/
            }
        });
    }

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
    		if(result === 'string'){
    			$("#register_error").html(result);
    		}else{
    			console.log(result)
    			var logindata={
    				"username":result.mobile,
    				"password":$("#register_pwd").val()
    			};
    			retrieveJwtToken(logindata,true);
    		}    		
    	}).fail(function(error) {
    		console.log(error);
    		if(error&&error.responseJSON){
    			$("#register_error").append("<li>"+error.responseJSON.errorMessage+"</li>");
    		}
    	});
    	
    });
});