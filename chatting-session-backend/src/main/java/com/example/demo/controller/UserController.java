package com.example.demo.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(value = "*")
public class UserController {

	
	@Autowired
	UserService userService;

	@GetMapping("/getUsers")
	public List<User> getUsers(HttpServletRequest request) {
		return this.userService.getUsers();
	}
	
	@GetMapping("/user/{sessionId}")
	public User getUser(@PathVariable("sessionId") String sessionId) {
		return this.userService.getUser(sessionId);
	}

	@PostMapping("/noOfUsers")
	public int userCount(@RequestBody String sessionId, HttpServletRequest request) {
		for (int i = 0; i < this.userService.getUsers().size(); i++) {
			if (sessionId.equals(userService.getUsers().get(i).getSessionId())) {
				userService.getUsers().get(i).setLastAccessedTime(((int) System.currentTimeMillis()));
			}
		}
		return this.userService.getUsers().size();
	}

	@GetMapping("/recentUser")
	public User name() {
		return this.userService.getUsers().get(this.userService.getUsers().size() - 1);
	}
	
	

	@PostMapping("/addUser")
	public User addUser(@RequestBody String name, HttpServletRequest request) {

//		HttpSession getSession = (HttpSession) request.getAttribute("session");
//
//		String session = (String) getSession.getId();

		Random rand = new Random();

		// Obtain a number between [0 - 49].
		String session = Integer.toString(rand.nextInt(1000000000));

		User newUser = new User(name, session, (int) System.currentTimeMillis());
		userService.addUser(newUser);

		return newUser;

	}
	


	
}
