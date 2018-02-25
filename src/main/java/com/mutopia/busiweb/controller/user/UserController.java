/**
 * <p>Title: UserController</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2018</p>
 * <p>Company: MUTOPIA</p>
 * @author lyx
 * @version 1.0
 */
package com.mutopia.busiweb.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
    private Environment env;
	
	@GetMapping("/smsRegister/{mobile}")
	public String smsRegister(@PathVariable String mobile) {
		
		RestTemplate restTemplate = new RestTemplate();
		
		String url = this.env.getProperty("mutopia.sysmgt.system")+"/user/smsRegister/{mobile}";
		
		String verifycode = restTemplate.getForObject(url, String.class, mobile);

		return verifycode;
	}

}
