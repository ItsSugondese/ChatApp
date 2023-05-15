package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.FriendRequest;
import com.example.demo.model.Friends;
import com.example.demo.model.User;

public interface FriendRepo extends JpaRepository<Friends, Integer>{

//	@Query("select f.fId from Friends f where f.sender = :sender and fr.acceptor = :acceptor")
//	List<Integer> findIdsBySenderAndAcceptor(@Param("sender") User sender, @Param("acceptor") User acceptor);
	
	@Query("SELECT f.fId FROM Friends f WHERE (f.sender = :user1 AND f.acceptor = :user2) OR (f.sender = :user2 AND f.acceptor = :user1)")
	List<Integer> findIdsByUsers(@Param("user1") User user1, @Param("user2") User user2);
	
	List<Friends> findBySenderOrAcceptor(User sender, User acceptor);


}
