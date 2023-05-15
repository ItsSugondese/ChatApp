package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.FriendRequest;
import com.example.demo.model.Friends;
import com.example.demo.model.User;
import com.example.demo.repo.FriendRepo;

@Service
public class FriendService {

	@Autowired
	private FriendRepo repo;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private FriendRequestService friendRequestService;
	
	
	public List<User> getFriends(String userId) {
		User user = userService.getUser(userId);
		List<User> users = new ArrayList();
		List<Friends> friends = repo.findBySenderOrAcceptor(user, user);
		
		for(Friends friend : friends) {
			if(friend.getSender().equals(user)) {
				users.add(friend.getAcceptor());
			}else if(friend.getAcceptor().equals(user)) {
				users.add(friend.getSender());
			}
		}
		return users;
	}
	
	public boolean becomeFriend(String senderId, String acceptorId) {
		System.out.println("Am I here??");
		User sender = userService.getUser(senderId);
		User acceptor = userService.getUser(acceptorId);
		
		//checking if the same request already exist in database by interchanging receiver with sender and vice versa
		List<Integer> ids = repo.findIdsByUsers(acceptor, sender);
		
		if (ids.size() == 1) {
			return false;
		}else {
			Friends friends = new Friends();
			friends.setSender(sender);
			friends.setAcceptor(acceptor);
			
			this.repo.save(friends);
			this.friendRequestService.removeRequest(senderId, acceptorId);
			return true;
		}	
	}
	
	public boolean removeRequest(String senderId, String receiverId) {
		User sender = userService.getUser(senderId);
		User receiver = userService.getUser(receiverId);

		System.out.println("Chill man its here");

		List<Integer> ids = repo.findIdsByUsers(sender, receiver);
		if (ids.size() == 1) {
			System.out.println("FUck it I'm here");
		    repo.deleteById(ids.get(0));
		}

		return false;
	}
	
	public int getNoOfFriends(String sessionId) {
		User user = userService.getUser(sessionId);
		return repo.findBySenderOrAcceptor(user, user).size();
	}
	

		
}
