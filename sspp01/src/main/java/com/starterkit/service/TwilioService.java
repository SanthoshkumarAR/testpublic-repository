package com.starterkit.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.gson.JsonObject;
import com.starterkit.utils.VCAPUtility;
import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import com.twilio.sdk.resource.factory.MessageFactory;
import com.twilio.sdk.resource.instance.Message;

@Component
public class TwilioService {

	@Autowired
	private VCAPUtility vCAPUtility;

	@Value("${twilio.accountSID}")
	private String accountSID;

	@Value("${twilio.authToken}")
	private String authToken;

	/**
	 * Send SMS via Twilio service
	 * 
	 * @param postBody
	 *            containing fields required to send SMS
	 * 
	 * @return
	 */
	public String sendSMS(JsonObject postbody) {
		JsonObject cloudConfig = vCAPUtility.getCredentials("twilio");
		JsonObject responseObj = new JsonObject();
		if (cloudConfig == null) {
			System.out.println("cf service 'twilio' - not found!");
			cloudConfig = new JsonObject();
			cloudConfig.addProperty("accountSID", accountSID);
			cloudConfig.addProperty("authToken", authToken);
		}
		TwilioRestClient client = new TwilioRestClient(cloudConfig.get("accountSID").getAsString(), cloudConfig.get("authToken").getAsString());

		// Build a filter for the MessageList
		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("Body", postbody.get("msg").getAsString()));
		params.add(new BasicNameValuePair("To", postbody.get("toNumber").getAsString()));
		params.add(new BasicNameValuePair("From", postbody.get("fromNumber").getAsString()));
		MessageFactory messageFactory = client.getAccount().getMessageFactory();
		try {
			Message message = messageFactory.create(params);
			responseObj.addProperty("status", message.getStatus());
			responseObj.addProperty("date", message.getDateCreated().toString());
			responseObj.addProperty("sid", message.getSid());
			return responseObj.toString();
		} catch (TwilioRestException e) {
			responseObj.addProperty("errorCode", e.getErrorCode());
			responseObj.addProperty("message", e.getErrorMessage());
			responseObj.addProperty("moreInfo", e.getMoreInfo());
			return responseObj.toString();
		}
	}
}
