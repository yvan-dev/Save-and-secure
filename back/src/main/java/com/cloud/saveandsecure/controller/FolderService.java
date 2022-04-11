package com.cloud.saveandsecure.controller;

import java.time.LocalDate;
import java.util.List;
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
public class FolderService implements FolderServiceinterf {
	@Autowired
	UserDao userDao;
	@Autowired
	FolderDao folderDao;

	@Override
	public ResponseEntity<String> addFolder(String folderName, int parent_folder_id) {
		if (folderName == "")
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Folder must have a name");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		if (folderDao.findByNameAndIdUser(folderName, userDb.getId()) != null)
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("Folder already exist");
		Folder folder = new Folder();
		folder.setName(folderName);
		folder.setIdParentFolder(parent_folder_id);
		folder.setCreationDate(LocalDate.now());
		folder.setIdUser(userDb.getId());
		folder.setNumberOfFile(0);
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
		folder.setNumberOfFile(0);
		folderDao.save(folder);
		return ResponseEntity.status(HttpStatus.CREATED).body("Root folder created");
	}

	@Override
	public ResponseEntity<Folder> getRootFolder() {
		try {
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			User userDb = userDao.findByLogin(auth.getPrincipal().toString());
			Folder rootFolder = folderDao.findByNameAndIdUser("/", userDb.getId());
			if (rootFolder == null)
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			return ResponseEntity.status(HttpStatus.OK).body(rootFolder);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/**
	 * It returns a list of folders that are children of the folder with the
	 * id_folder parameter
	 *
	 * @param id_folder the id of the folder whose subfolders you want to retrieve
	 * @return A list of folders
	 */
	@Override
	public ResponseEntity<List<Folder>> getFoldersOfParentFolder(int id_folder) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		if (userDb == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		Folder folder = folderDao.findByIdAndIdUser(id_folder, userDb.getId());
		if (folder == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		List<Folder> folders = folderDao.findByIdParentFolder(id_folder);
		return ResponseEntity.status(HttpStatus.OK).body(folders);
	}

	@Override
	public ResponseEntity<String> updateFolderName(int id_folder, String folder_name) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		if (folderDao.findByNameAndIdUser(folder_name, userDb.getId()) != null)
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED)
					.body("Le dossier " + folder_name + " existe déjà!");
		Folder dbFolder = folderDao.findById(id_folder);
		if (dbFolder == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Dossier " + folder_name + " non trouvé sur le serveur");
		dbFolder.setName(folder_name);
		folderDao.save(dbFolder);
		return ResponseEntity.ok().build();
	}
}
