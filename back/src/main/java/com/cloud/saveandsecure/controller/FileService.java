package com.cloud.saveandsecure.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cloud.saveandsecure.dao.FileDao;
import com.cloud.saveandsecure.dao.FolderDao;
import com.cloud.saveandsecure.dao.UserDao;
import com.cloud.saveandsecure.interfac.FileServiceInterf;
import com.cloud.saveandsecure.model.File;
import com.cloud.saveandsecure.model.Folder;
import com.cloud.saveandsecure.model.User;

@RestController
@RequestMapping("/file")
public class FileService implements FileServiceInterf{
	@Autowired
	UserDao userDao;
	@Autowired
	FileDao fileDao;
	@Autowired
	FolderDao folderDao;

	@Override
	public ResponseEntity<String> uploadFileToLocal(MultipartFile file) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();		
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		if (userDb == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		File fileDb = new File();
		String fileBasePath = "/files/schoolName/" + userDb.getLogin() + "/"; // schoolName = SchoolDao.findById(userDao.getIdSchool()).getName()
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		fileDb.setCreationDate(LocalDate.now());
		fileDb.setName(fileName);
		fileDb.setSize(file.getSize());
		fileDao.save(fileDb);
		Path path = Paths.get(fileBasePath + fileName);
		try {
			if (!Files.exists(path))
				Files.createDirectories(path);
			Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/files/download/")
				.path(fileName)
				.toUriString();
		return ResponseEntity.status(HttpStatus.OK).body(fileDownloadUri);
	}
	
	public ResponseEntity<String> uploadFileToDB(MultipartFile file) {
		try {
			File fileDb = new File();
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());
			fileDb.setName(fileName);
			fileDb.setSize(file.getSize());
			fileDb.setIdFolder(1);
			fileDb.setCreationDate(LocalDate.now());
			fileDb.setFile(file.getBytes());
			fileDao.save(fileDb);
			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/files/download/")
					.path(fileName).path("/db")
					.toUriString();
			return ResponseEntity.ok(fileDownloadUri);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	public ResponseEntity<UrlResource> downloadFileFromLocal(String file_name) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();		
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		String fileBasePath = "/files/schoolName/" + userDb.getLogin() + "/";
		Path path = Paths.get(fileBasePath + file_name);
		UrlResource resource = null;
		try {
			resource = new UrlResource(path.toUri());
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType("application/octet-stream"))
				.header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	
	public ResponseEntity<byte[]> downloadFileFromDB(String file_name) {
		File file = fileDao.findByName(file_name);
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType("application/octet-stream"))
				.header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file_name + "\"")
				.body(file.getFile());
	}

	@Override
	public ResponseEntity<List<File>> getFilesOfFolder(int id_folder) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();		
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		if (userDb == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		//Folder folder = folderDao.findByIdAndIdUser(id_folder, userDb.getId());
		//if (folder == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		List<File> files = fileDao.findByIdFolder(id_folder);
		return ResponseEntity.status(HttpStatus.OK).body(files);
	}
}
