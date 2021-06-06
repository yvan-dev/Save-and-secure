package com.cloud.saveandsecure.interfac;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cloud.saveandsecure.model.User;

public interface AuthenticateServiceInterf {
	@PostMapping
	@CrossOrigin
	public ResponseEntity<User> login(@RequestBody User user);
}
