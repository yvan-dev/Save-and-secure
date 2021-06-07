package com.cloud.saveandsecure.model;

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
public class School {
	@Id
	@GeneratedValue
	private Integer id;
	private String name;
	private String password;
	private String domain;
	private String logo;
}
