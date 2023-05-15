package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.FriendRequest;
import com.example.demo.model.Friends;
import com.example.demo.model.User;
import com.example.demo.repo.UserRepo;
import com.example.demo.service.FriendRequestService;
import com.example.demo.service.FriendService;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(value = "*")
public class FindFriendController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private FriendRequestService friendRequestService;
	
	@Autowired
	private FriendService friendService;
	
	@PostMapping("/canAddUser")
	public List<User> getUsersAsFriends( @RequestBody String senderId) {
		List<User> usersToNotShow =  new ArrayList<>();
		for(FriendRequest request : friendRequestService.getAllSenderRequests(senderId)) {
		usersToNotShow.add(request.getReceiver());	
		}
		
		for(FriendRequest request : friendRequestService.getAllReceiverRequests(senderId)) {
			usersToNotShow.add(request.getSender());
		}
		
		for(User friends : friendService.getFriends(senderId)) {
			usersToNotShow.add(friends);
		}
		
		
	
				 
		User user = this.userService.getUser(senderId);
		List<User> users = userService.getUsers();
		if(user != null) {
			users.remove(user);
			for(User removeUser : usersToNotShow) {
				users.remove(removeUser);
			}
		}
		return users;
	}
}
