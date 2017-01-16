package com.starterkit.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



/**
 * This is Controller
 * 
 * @author narendra.gurram@cognizant.com
 */

@Controller
public class AlbumController {

	/**
	 * Default Welcome page
	 * @return
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String welcome() {
		return "welcome";
	}

}