package com.cloud.saveandsecure.controller;

import com.cloud.saveandsecure.dao.StorageDao;
import com.cloud.saveandsecure.dao.UserDao;
import com.cloud.saveandsecure.interfac.StorageServiceInterf;
import com.cloud.saveandsecure.model.Storage;
import com.cloud.saveandsecure.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/storage")
public class StorageService implements StorageServiceInterf {

    @Autowired
    UserDao userDao;
    @Autowired
    StorageDao storageDao;

    @Override
    public ResponseEntity<Storage> getStorageUser() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User userDb = userDao.findByLogin(auth.getPrincipal().toString());
            Storage storageUser = storageDao.findByIdUser(userDb.getId());
            if (storageUser == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            return ResponseEntity.status(HttpStatus.OK).body(storageUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}