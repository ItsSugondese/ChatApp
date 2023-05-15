package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.SenderReceiver;
import com.example.demo.model.User;
import com.example.demo.service.FriendService;

@RestController
@CrossOrigin(value = "*")
public class FriendController {

	
	@Autowired
	private FriendService service;
	
	@GetMapping("/getFriends/{userId}")
	public List<User> getFriends(@PathVariable("userId") String userId){
		return this.service.getFriends(userId);
	}
	
	@PostMapping("/becomeFriend")
	public boolean addFriend(@RequestBody SenderReceiver senderReceiver) {
		return service.becomeFriend(senderReceiver.getSender(), senderReceiver.getReceiver());
		
	}
	
	@PostMapping("/removeFriend")
	public boolean removeRequest(@RequestBody SenderReceiver senderReceiver) {
		return service.removeRequest(senderReceiver.getSender(), senderReceiver.getReceiver());	
	}
	
	@GetMapping("/getNumberOfFriends/{sessionId}")
	public int removeRequest(@PathVariable("sessionId") String sessionId) {
		return service.getNoOfFriends(sessionId);
		
	}
}
