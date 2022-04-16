package com.cloud.saveandsecure.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class File {
	@Id
	@GeneratedValue
	private Integer id;
	@Column(name = "id_folder", columnDefinition = "integer default 1", nullable = false)
	private Integer idFolder;
	private String name;
	@Column(name = "creation_date")
	private LocalDate creationDate;
	private Double size;
    @Lob
    private byte[] file;
}
