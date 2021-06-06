package com.cloud.saveandsecure.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
	@Id
	@GeneratedValue
	private Integer id;
	@Column(name = "id_school", nullable = false)
	private Integer idSchool;
	@Column(columnDefinition = "varchar(255) not null")
	private String login;
	@Column(columnDefinition = "varchar(255) not null")
	private String password;
	@Column(name = "last_name")
	private String lastName;
	@Column(name = "first_name")
	private String firstName;
	private Integer age;
	private String level;
	@Column(columnDefinition = "text")
	private String token;
	private String status; // Admin ou User
}
