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

import com.cloud.saveandsecure.dao.FileDao;
import com.cloud.saveandsecure.dao.FolderDao;
import com.cloud.saveandsecure.dao.StorageDao;
import com.cloud.saveandsecure.dao.UserDao;
import com.cloud.saveandsecure.interfac.FolderServiceinterf;
import com.cloud.saveandsecure.model.File;
import com.cloud.saveandsecure.model.Folder;
import com.cloud.saveandsecure.model.Storage;
import com.cloud.saveandsecure.model.User;

@RestController
@RequestMapping("/folder")
public class FolderService implements FolderServiceinterf {
	@Autowired
	UserDao userDao;
	@Autowired
	FolderDao folderDao;
	@Autowired
	FileDao fileDao;
	@Autowired
	StorageDao storageDao;

	@Override
	public ResponseEntity<String> addFolder(String folderName, int parent_folder_id) {
		if (folderName == "")
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Folder must have a name");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		if (folderDao.findByNameAndIdUserAndIdParentFolder(folderName, userDb.getId(), parent_folder_id) != null)
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
		if (folderDao.findByNameAndIdUserAndIdParentFolder(folder.getName(), userDb.getId(),
				folder.getIdParentFolder()) != null)
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

	// TODO : Suppression récursive de tous les sous dossiers et fichiers
	@Override
	public ResponseEntity<String> deleteFolder(int id_folder) {
		// First Delete all files in the folder
		try {
			List<File> files = fileDao.findByIdFolder(id_folder);
			FileService fileService = new FileService();
			files.forEach(file -> {
				try {
					fileService.deleteFile(file.getId());
				} catch (Exception e) {
					throw new RuntimeException("Erreur lors de la suppression d'un fichier du répertoire");
				}
			});
			// Then delete the folder
			folderDao.deleteById(id_folder);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
		}
	}

	@Override
	public ResponseEntity<String> createRootFolder() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		if (folderDao.findByNameAndIdUser("/", userDb.getId()) != null)
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("Folder root already exist");
		Folder folder = new Folder();
		Storage storage = new Storage();
		folder.setCreationDate(LocalDate.now());
		folder.setIdUser(userDb.getId());
		folder.setName("/");
		folder.setNumberOfFile(0);
		storage.setIdUser(userDb.getId());
		storage.setTotal(100.0); // User start with 100 Mo
		storage.setRestant(100.0);
		folderDao.save(folder);
		storageDao.save(storage);
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
		Folder dbFolder = folderDao.findById(id_folder);
		if (folderDao.findByNameAndIdUserAndIdParentFolder(folder_name, userDb.getId(), dbFolder.getIdParentFolder()) != null)
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED)
					.body("Le dossier " + folder_name + " existe déjà!");
		if (dbFolder == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Dossier " + folder_name + " non trouvé sur le serveur");
		dbFolder.setName(folder_name);
		folderDao.save(dbFolder);
		return ResponseEntity.ok().build();
	}
}
