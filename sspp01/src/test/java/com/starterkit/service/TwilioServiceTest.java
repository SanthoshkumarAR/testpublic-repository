package com.starterkit.service;
/**
 * 
 */

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.boot.test.SpringApplicationConfiguration;

import com.google.gson.JsonObject;
import com.starterkit.Application;
import com.starterkit.service.TwilioService;
import com.starterkit.utils.VCAPUtility;

/**
 * @author narendra.gurram@cognizant.com
 *
 */
@RunWith(MockitoJUnitRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
public class TwilioServiceTest {

	@InjectMocks
	private VCAPUtility vCAPUtility = new VCAPUtility();

	@Mock
	private TwilioService twilioService;

	@Test
	public void twilioService() {
		JsonObject postbody = new JsonObject();
		postbody.addProperty("fromNumber", "+12563694767");
		postbody.addProperty("toNumber", "+919789713813");
		postbody.addProperty("msg", "Some Message");
		twilioService.sendSMS(postbody);
		Assert.assertTrue(true);
	}

}
