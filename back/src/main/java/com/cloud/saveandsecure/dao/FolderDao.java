package com.cloud.saveandsecure.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cloud.saveandsecure.model.Folder;

public interface FolderDao extends JpaRepository<Folder, Integer>{
	Folder findById(int id);
	Folder findByIdAndIdUser(int id, int id_user);
	Folder findByIdAndIdUserAndIdParentFolder(int id, int id_user, int id_parent_folder);
	Folder findByName(String name);
	List<Folder> findByIdUser(int id_user);
	Folder findByNameAndIdUser(String string, int id_user);
	Folder findByNameAndIdUserAndIdParentFolder(String string, int id_user, int id_parent_folder);
	List<Folder> findByIdParentFolder(int id_parent);
}
