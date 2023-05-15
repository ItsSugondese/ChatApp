package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Message {

	private String from;
	private String to;
	private String content;
}
