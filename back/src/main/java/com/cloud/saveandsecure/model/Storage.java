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
public class Storage {
	@Id
	@GeneratedValue
	private Integer id;
	@Column(name = "id_user", nullable = false)
	private Integer idUser;
	private Double total;
	private Double restant;	
}
