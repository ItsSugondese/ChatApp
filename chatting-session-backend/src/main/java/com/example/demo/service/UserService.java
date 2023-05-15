package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepo;

@Service
public class UserService {

	
	@Autowired
	UserRepo users;
	
	
	public List<User> getUsers(){
		return this.users.findAll();
	}
	
	public User getUser(String sessionId) {
		return this.users.findBySessionId(sessionId);
	}
	
	public void addUser(User user) {
		this.users.save(user);
	}
	
	public void removeUser(User user) {
		users.delete(user);
	}
	
}
