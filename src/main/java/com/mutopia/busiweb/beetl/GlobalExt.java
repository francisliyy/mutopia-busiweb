/**
 * <p>Title: GlobalExt</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2018</p>
 * <p>Company: MUTOPIA</p>
 * @author lyx
 * @version 1.0
 */
package com.mutopia.busiweb.beetl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.beetl.core.GroupTemplate;
import org.beetl.core.Template;
import org.beetl.ext.web.WebRenderExt;

public class GlobalExt implements WebRenderExt{

	public void modify(Template template, GroupTemplate arg1, HttpServletRequest request, HttpServletResponse arg3) {
		// TODO Auto-generated method stub
		
		String contextPath = request.getContextPath();
		String framePath = contextPath+"/node_modules";
		String cssPath = contextPath+"/css";
		String jsPath = contextPath+"/javascript";
		String imagePath = contextPath+"/images";
		
		template.binding("framePath", framePath);
		template.binding("cssPath", cssPath);
		template.binding("jsPath", jsPath);
		template.binding("imagePath", imagePath);
		
		
	}

}
