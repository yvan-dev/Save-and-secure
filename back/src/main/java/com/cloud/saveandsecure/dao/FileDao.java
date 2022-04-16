package com.cloud.saveandsecure.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cloud.saveandsecure.model.File;

public interface FileDao extends JpaRepository<File, Integer>{
	File findById(int id);
	File findByName(String name);
	File findByNameAndIdFolder(String string, int id__folder);
	List<File> findByIdFolder(int id_folder);
}