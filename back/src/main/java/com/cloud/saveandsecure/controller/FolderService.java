package com.cloud.saveandsecure.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cloud.saveandsecure.dao.FolderDao;
import com.cloud.saveandsecure.dao.UserDao;
import com.cloud.saveandsecure.interfac.FolderServiceinterf;
import com.cloud.saveandsecure.model.Folder;
import com.cloud.saveandsecure.model.User;

@RestController
@RequestMapping("/folder")
public class FolderService implements FolderServiceinterf{
	@Autowired
	UserDao userDao;
	@Autowired
	FolderDao folderDao;
	
	@Override
	public ResponseEntity<String> addFolder(Folder folder) {
		if (folder == null || folder.getName() == "")
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Folder must have a name");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();		
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		if (folderDao.findByNameAndIdUser(folder.getName(), userDb.getId()) != null)
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("Folder already exist");
		folder.setCreationDate(LocalDate.now());
		folder.setIdUser(userDb.getId());
		folderDao.save(folder);
		return ResponseEntity.ok().build();
	}

	@Override
	public ResponseEntity<List<Folder>> getFolderUser(int id_user) {
		return ResponseEntity.status(HttpStatus.OK).body(folderDao.findByIdUser(id_user));
	}
	
	@Override
	public ResponseEntity<String> updateFolder(Folder folder) {
		if (folder == null || folder.getName() == "" || folder.getId() == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Folder must have a name");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();		
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		if (folderDao.findByNameAndIdUser(folder.getName(), userDb.getId()) != null)
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("Folder already exist");
		if (!folderDao.existsById(folder.getId()))
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Folder not found");
		Folder folderDb = folderDao.findById(folder.getId()).get();
		folder.setIdUser(userDb.getId());
		folder.setCreationDate(LocalDate.now());
		folder.setNumberOfFile(folderDb.getNumberOfFile());
		folderDao.save(folder);
		return ResponseEntity.ok().build();
	}

	@Override
	public ResponseEntity<String> deleteFolder(int id_folder) {
		folderDao.deleteById(id_folder);
		return ResponseEntity.ok().build();
	}

	@Override
	public ResponseEntity<String> createRootFolder() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();		
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		if (folderDao.findByNameAndIdUser("/", userDb.getId()) != null)
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("Folder root already exist");
		Folder folder = new Folder();
		folder.setCreationDate(LocalDate.now());
		folder.setIdUser(userDb.getId());
		folder.setName("/");
		folderDao.save(folder);
		return ResponseEntity.status(HttpStatus.CREATED).body("Root folder created");
	}


}
