package com.cloud.saveandsecure.interfac;

import java.util.List;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.cloud.saveandsecure.model.File;

public interface FileServiceInterf {
	@PostMapping("/upload")
	ResponseEntity<String> uploadFileToLocal(@RequestBody MultipartFile file);
	@PostMapping("/upload/db")
	public ResponseEntity<String> uploadFileToDB(@RequestBody MultipartFile file);
	@GetMapping("/{file_name}")
	ResponseEntity<UrlResource> downloadFileFromLocal(@PathVariable String file_name);
	@GetMapping("/db/{file_name}")
	ResponseEntity<byte[]> downloadFileFromDB(@PathVariable String file_name);
	@GetMapping("/folder/{id_folder}")
	ResponseEntity<List<File>> getFilesOfFolder(@PathVariable int id_folder);
}
