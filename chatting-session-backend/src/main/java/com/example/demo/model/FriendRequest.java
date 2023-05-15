package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "friend_request")
public class FriendRequest {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int frId;
	
	@ManyToOne
	@JoinColumn(name= "sender_id")
	private User sender;
	
	@ManyToOne
	@JoinColumn(name= "receiver_id")
	private User receiver;
}
