package com.cloud.saveandsecure.interfac;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cloud.saveandsecure.model.User;

// Path =  "/user"
public interface UserServiceInterf {
	@PostMapping
	public ResponseEntity<String> addUser(@RequestBody User user);

	@PutMapping
	public ResponseEntity<Void> updateUser(@RequestBody User user);

	@GetMapping("/all")
	public ResponseEntity<List<User>> getAllUser();

	@GetMapping("/id/{id_user}")
	public ResponseEntity<Optional<User>> getUser(@PathVariable Integer id_user);

	@GetMapping("/search/{pattern}")
	public ResponseEntity<List<User>> getUserByFirstOrLastNameOrLogin(@PathVariable String pattern);

	@GetMapping("/userLogged")
	public ResponseEntity<User> getUserLogged();

	public User getUserByLogin(String login);

	@DeleteMapping("{id_user}")
	public ResponseEntity<Void> deleteUser(@PathVariable Integer id_user);

}
