/**
 * <p>Title: BeetlController</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2018</p>
 * <p>Company: MUTOPIA</p>
 * @author lyx
 * @version 1.0
 */
package com.mutopia.busiweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	@RequestMapping("/home.html")
	public  String say(Model model){
		model.addAttribute("name","hello,world");
		return "/home.btl";
	}
	
	/*@RequestMapping("")
	public @ ResponseBody String sayHello(Model model){		
		return "hello";
	}*/

}
