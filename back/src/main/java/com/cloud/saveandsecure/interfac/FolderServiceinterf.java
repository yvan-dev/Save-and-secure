package com.cloud.saveandsecure.interfac;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cloud.saveandsecure.model.Folder;

public interface FolderServiceinterf {
	@PostMapping("/parentFolder/{parent_folder_id}")
	ResponseEntity<String> addFolder(@RequestBody String folderName, @PathVariable int parent_folder_id);
	@GetMapping("/parentFolder/{id_folder}")
	ResponseEntity<List<Folder>> getFoldersOfParentFolder(@PathVariable int id_folder);
	@GetMapping("/idUser/{id_user}")
	ResponseEntity<List<Folder>> getFolderUser(@PathVariable int id_user);
	@GetMapping("/getRootFolder")
	ResponseEntity<Folder> getRootFolder();
	@PutMapping
	ResponseEntity<String> updateFolder(@RequestBody Folder folder);
	@DeleteMapping("/{id_folder}")
	ResponseEntity<String> deleteFolder(@PathVariable int id_folder);
	@GetMapping("/createRootFolder")
	ResponseEntity<String> createRootFolder();
	@PutMapping("/update/{id_folder}")
	ResponseEntity<String> updateFolderName(@PathVariable int id_folder, @RequestBody String folder_name);
}
