package com.example.demo.controller.socketController;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Message;

@RestController
public class MessageSocketController {

	@Autowired
	private SimpMessagingTemplate messagingTemplate;
	
	@MessageMapping("/getMessage")
	public void sendNewMessage(Message message, final Principal principal) throws InterruptedException {
		
		System.out.println(message.getContent());
		messagingTemplate.convertAndSendToUser(message.getFrom(), "/topic/newMessage", message);
		messagingTemplate.convertAndSendToUser(message.getTo(), "/topic/newMessage", message);
	}

	
//	@MessageMapping("/getMessage")
//	@SendToUser("/topic/newMessage")
//	public void sendNewMessage(Message message, final Principal principal) throws InterruptedException {
//		
//		System.out.println(message.getContent());
//		messagingTemplate.convertAndSendToUser(message.getFrom(), "/user/" + message.getFrom() + "/outbox", message);
//		messagingTemplate.convertAndSendToUser(message.getTo(), "/user/" + message.getTo() + "/inbox", message);
//	}
}
