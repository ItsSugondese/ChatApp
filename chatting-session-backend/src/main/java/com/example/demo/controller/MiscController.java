package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(value = "*")
public class MiscController {

	final int time = 1000 * 20;
	
	
	@Autowired
	private UserService userService;
	
	
	
	@PostMapping("/checkSession")
	public boolean checkSession( @RequestBody String sessionId) {
		User user = this.userService.getUser(sessionId);
		if(user != null) {
			
			return true;
		}else {
			return false;
		}
	}
	
//	@Scheduled(fixedRate = time)
//	public void shee() {
//		if (this.userService.getUsers().size() > 0) {
//			for (int i = 0; i < this.userService.getUsers().size(); i++) {
//				int timeGap = ((int) System.currentTimeMillis()
//						- this.userService.getUsers().get(i).getLastAccessedTime()) / 1000;
//				if (timeGap > 15) {
//					this.userService.getUsers().remove(i);
//				}
//			}
//		}
//	}
}
