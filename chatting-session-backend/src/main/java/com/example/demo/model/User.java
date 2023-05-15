package com.example.demo.model;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
public class User {

	private String name;
	@Id
	private String sessionId;
	private int lastAccessedTime;
}
