package com.cloud.saveandsecure.interfac;

import com.cloud.saveandsecure.model.Storage;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public interface StorageServiceInterf {
    @GetMapping("/userLogged")
    ResponseEntity<Storage> getStorageUser();
}
