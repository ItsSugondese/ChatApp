package com.example.demo.model;

import java.security.Principal;

public class UserPrincipal implements Principal{
	
	private String name;

	
	

	public UserPrincipal(String name) {
		this.name = name;
	}




	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return this.name;
	}
	
	

}
