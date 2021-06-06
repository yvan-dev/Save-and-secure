package com.cloud.saveandsecure.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cloud.saveandsecure.model.Folder;

public interface FolderDao extends JpaRepository<Folder, Integer>{
	Folder findById(int id);
	Folder findByIdAndIdUser(int id, int id_user);
	Folder findByName(String name);
	List<Folder> findByIdUser(int id_user);
	Folder findByNameAndIdUser(String string, int id_user);
	List<Folder> findByIdParentFolder(int id_parent);
}
