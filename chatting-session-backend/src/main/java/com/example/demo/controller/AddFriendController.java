package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.FriendRequest;
import com.example.demo.model.User;
import com.example.demo.service.FriendRequestService;

@RestController
@CrossOrigin(value = "*")
public class AddFriendController {

	@Autowired
	private FriendRequestService service;
	
	
	@GetMapping("/whoSend/{sessionId}")
	public List<User> whoSend(@PathVariable("sessionId") String sessionId) {
		List<FriendRequest> requestData =  this.service.getAllReceiverRequests(sessionId);
		List<User> senders = new ArrayList();
		
		for(FriendRequest friendRequest : requestData) {
			senders.add(friendRequest.getSender());
		}
		
		return senders;
	}
	
	
	
}
