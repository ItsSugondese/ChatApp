package com.example.demo.controller.socketController;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import com.example.demo.model.Greeting;
import com.example.demo.model.HelloMessage;


@RestController
public class GreetingController {
	
	@Autowired
	SimpUserRegistry simpUserRegistry;
	
	  
	 
	  
	  @MessageMapping("/greet")
	  @SendTo("/topic/greetings")
	  public Greeting greeting(HelloMessage message, SimpMessageHeaderAccessor headerAccessor) throws Exception {
		System.out.println("Hello there");
		System.out.println(message);
	    return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
	  }
	  
	  @GetMapping("/fuck")
	  public String getUsers() {
		  return "Number of connected users is " + simpUserRegistry.getUserCount();
	  }
}
