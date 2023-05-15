package com.example.demo.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.FriendRequest;
import com.example.demo.model.SenderReceiver;
import com.example.demo.model.User;
import com.example.demo.service.FriendRequestService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(value = "*")
public class FriendRequestController {

	@Autowired
	private FriendRequestService service;

	@PostMapping("/addRequest")
	public boolean addRequest(@RequestBody SenderReceiver senderReceiver) {
		return service.addRequest(senderReceiver.getSender(), senderReceiver.getReceiver());
		
	}
	
	@PostMapping("/removeRequest")
	public boolean removeRequest(@RequestBody SenderReceiver senderReceiver) {
		return service.removeRequest(senderReceiver.getSender(), senderReceiver.getReceiver());	
	}
	
	@GetMapping("/getNumberOfRequests/{sessionId}")
	public int removeRequest(@PathVariable("sessionId") String sessionId) {
		return service.noOfRequests(sessionId);
		
	}
	


//	@GetMapping("/getRequests/{sessionId}")
//	public List<FriendRequest> getFriendRequests(@PathVariable("sessionId") String sessionId) {
//		return service.getAllRequests(sessionId);
//	}

}
