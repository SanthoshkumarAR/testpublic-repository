package com.starterkit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.starterkit.service.TwilioService;


/**
 * File : TwilioController.java 
 * Description : Router controller for twilio api service 
 * Revision History :
 * Version 	Date 		Author Reason
 * 0.1 		30-Aug-2016 324401 Initial version
 */

@CrossOrigin
@RestController
public class TwilioController {

	@Autowired
	private TwilioService twilioService;

	/**
	 * Router to send twilio sms
	 * 
	 * @param input - json object
	 */
	@CrossOrigin
	@RequestMapping(value = "/api/sms", method = RequestMethod.POST, headers = "Content-type=application/json")
	public String deploy(@RequestBody String input) {
		JsonParser parser = new JsonParser();
		JsonObject postbody = (JsonObject) parser.parse(input);
		return twilioService.sendSMS(postbody);
	}
}
