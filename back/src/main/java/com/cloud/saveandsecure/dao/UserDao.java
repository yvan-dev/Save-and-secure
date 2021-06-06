package com.cloud.saveandsecure.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.cloud.saveandsecure.model.User;

@Service
@Repository
public interface UserDao extends JpaRepository<User, Integer> {
	
	User findById(int id);
	User findByLogin(String login);
	User findByToken(String token);
	//List<User> findByNameLike(String pattern);
	//List<User> findByFirstNameOrLastName(String name);
	@Modifying
	@Query("update User user set user.token = :token where user.id = :id")
	int updateTokenUser(@Param("token") String token, @Param("id") Integer id);
}