package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.FriendRequest;
import com.example.demo.model.User;
import com.example.demo.repo.FriendRequestRepo;

@Service
public class FriendRequestService {

	@Autowired
	private FriendRequestRepo repo;

	@Autowired
	private UserService users;

	
	//gets all the FriendRequest model in list based on receiving user
	public List<FriendRequest> getAllReceiverRequests(String receiverId) {
		User receiver = users.getUser(receiverId);
		return this.repo.findByReceiver(receiver);
	}

	//gets all the FriendRequest model in list based on sending user
	public List<FriendRequest> getAllSenderRequests(String senderId) {
		User sender = users.getUser(senderId);
		return this.repo.findBySender(sender);
	}
	
	

	//returns no. of friend reqeust receiver has got
	public int noOfRequests(String receiverId) {
		User receiver = users.getUser(receiverId);
		return this.repo.findByReceiver(receiver).size();
	}

	//add new friend request to the database 
	public boolean addRequest(String senderId, String receiverId) {
		User sender = users.getUser(senderId);
		User receiver = users.getUser(receiverId);
		
		
		//checking if the same request already exist in database by interchanging receiver with sender and vice versa
		List<Integer> ids = repo.findIdsByUsers(receiver, sender);
		
		if (ids.size() == 1) {
			return false;
		}else {
			FriendRequest request = new FriendRequest();
			request.setSender(sender);
			request.setReceiver(receiver);
			this.repo.save(request);
			return true;
		}

		
	}
	
	public boolean removeRequest(String senderId, String receiverId) {
		User sender = users.getUser(senderId);
		User receiver = users.getUser(receiverId);

		List<Integer> ids = repo.findIdsByUsers(sender, receiver);
		if (ids.size() == 1) {
		    repo.deleteById(ids.get(0));
		}

		return false;
	}

}
