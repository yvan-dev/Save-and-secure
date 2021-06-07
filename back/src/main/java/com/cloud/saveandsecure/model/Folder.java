package com.cloud.saveandsecure.model;

import java.time.LocalDate;

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
public class Folder {
	
	@Id
	@GeneratedValue
	private Integer id;
	@Column(name = "id_parent_folder", columnDefinition = "integer default 1")
	private Integer idParentFolder = 1; // default parent folder = root folder = 1
	@Column(name = "id_user", nullable = false)
	private Integer idUser;
	@Column(nullable = false)
	private String name;
	@Column(name = "creation_date")
	private LocalDate creationDate;
	@Column(name = "number_of_file")
	private Integer numberOfFile;
}
