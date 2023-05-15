package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Friends {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int fId;
	
	@ManyToOne
	@JoinColumn(name = "sender_id")
	private User sender;
	
	@ManyToOne
	@JoinColumn(name = "acceptor_id")
	private User acceptor;
}
