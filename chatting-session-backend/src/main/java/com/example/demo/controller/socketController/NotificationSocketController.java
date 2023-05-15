package com.example.demo.controller.socketController;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.FriendRequest;
import com.example.demo.model.Message;
import com.example.demo.service.FriendRequestService;
import com.example.demo.service.FriendService;

@RestController
public class NotificationSocketController {

	@Autowired
	private FriendRequestService friendRequestService;
	

	
	@Autowired
	private FriendService friendService;
	

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

//	@MessageMapping("/getNoOfRequests")
//	@SendTo("/topic/updateNumber")
//	public int sendNoOfRequests(@Header("senderId") String sender , String receiver) {
//		
//		
//		return service.noOfRequests(receiver);
//	
//	}

//	@MessageMapping("/getNoOfRequests")
//	@SendToUser("/topic/updateNumber")
//	    public void getPrivateMessage(String receiver,
//	                                             final Principal principal) throws InterruptedException {
//		   System.out.println(receiver);
//		   System.out.println("Here am I bitch");
//		   messagingTemplate.convertAndSendToUser(receiver, "/topic/updateNumber", service.noOfRequests(receiver));
//	       
//	    }

	@MessageMapping("/getNoOfRequests")
	@SendToUser("/topic/updateRequestNumber")
	public void sendFriendRequestNotification(String receiver, final Principal principal) throws InterruptedException {
		messagingTemplate.convertAndSendToUser(receiver, "/topic/updateRequestNumber", friendRequestService.noOfRequests(receiver));
	}
	
	
	
	
	@MessageMapping("/getNoOfFriends")
	@SendToUser("/topic/updateFriendNumber")
	public void sendNewFriendNotification(@Header("acceptor") String acceptor, String sender, final Principal principal) throws InterruptedException {
		
		
		messagingTemplate.convertAndSendToUser(sender, "/topic/updateFriendNumber", friendService.getNoOfFriends(sender));
		messagingTemplate.convertAndSendToUser(acceptor, "/topic/updateFriendNumber", friendService.getNoOfFriends(acceptor));
	}
	
	@MessageMapping("/getNewMessage")
	public void sendNewMessageNotification(Message message, final Principal principal) throws InterruptedException {
		Map<String, Object> messagePayload = new HashMap<>();
		messagePayload.put("userId", message.getTo());
		messagePayload.put("booleanValue", false);
		messagingTemplate.convertAndSendToUser(message.getFrom(), "/topic/messageNotification", messagePayload);
		
		messagePayload.put("userId", message.getFrom());
		messagePayload.put("booleanValue", true);
		messagingTemplate.convertAndSendToUser(message.getTo(), "/topic/messageNotification", messagePayload);
	}
	
	@MessageMapping("/firstMessage")
	public void sendNoMessageNotification(Message message, final Principal principal) throws InterruptedException {
		Map<String, Object> messagePayload = new HashMap<>();
		messagePayload.put("userId", message.getTo());
		messagePayload.put("booleanValue", false);
		messagingTemplate.convertAndSendToUser(message.getFrom(), "/topic/messageNotification", messagePayload);
		
		messagePayload.put("userId", message.getFrom());
		messagePayload.put("booleanValue", false);
		messagingTemplate.convertAndSendToUser(message.getTo(), "/topic/messageNotification", messagePayload);
	}
	
	@MessageMapping("/getTyping")
	public void sendTypingNotification(Message message, final Principal principal) throws InterruptedException {
		Map<String, Object> messagePayload = new HashMap<>();
		messagePayload.put("userId", message.getFrom());
		messagePayload.put("booleanValue", true);
		messagingTemplate.convertAndSendToUser(message.getTo(), "/topic/typingNotification", messagePayload);
	}
	
	@MessageMapping("/removeTyping")
	public void removingTypingNotification(Message message, final Principal principal) throws InterruptedException {
		Map<String, Object> messagePayload = new HashMap<>();
		messagePayload.put("userId", message.getFrom());
		messagePayload.put("booleanValue", false);
		messagingTemplate.convertAndSendToUser(message.getTo(), "/topic/typingNotification", messagePayload);
	}

}
