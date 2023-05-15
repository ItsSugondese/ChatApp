package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.FriendRequest;
import com.example.demo.model.User;

public interface FriendRequestRepo extends JpaRepository<FriendRequest, Integer>{

	public List<FriendRequest> findBySender(User sender);
	public List<FriendRequest> findByReceiver(User receiver);

//	@Query("select fr.frId from FriendRequest fr where fr.sender = :sender and fr.receiver = :receiver")
//	List<Integer> findIdsBySenderAndReceiver(@Param("sender") User sender, @Param("receiver") User receiver);
	
	@Query("SELECT fr.frId FROM FriendRequest fr WHERE (fr.sender = :user1 AND fr.receiver = :user2) OR (fr.sender = :user2 AND fr.receiver = :user1)")
	List<Integer> findIdsByUsers(@Param("user1") User user1, @Param("user2") User user2);


}
