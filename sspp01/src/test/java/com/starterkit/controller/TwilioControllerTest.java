package com.starterkit.controller;
/**
 * 
 */

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.starterkit.Application;
import com.starterkit.controller.TwilioController;
import com.starterkit.service.TwilioService;

/**
 * @author narendra.gurram@cognizant.com
 *
 */
@SpringApplicationConfiguration(classes = Application.class)
public class TwilioControllerTest {

	private MockMvc mockMvc;

	@InjectMocks
	private TwilioService twilioService;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		this.mockMvc = MockMvcBuilders.standaloneSetup(new TwilioController()).build();
	}

	@Test
	public void twilioController() throws Exception {
		this.mockMvc.perform(MockMvcRequestBuilders.post("/api/sms"));
	}
}
