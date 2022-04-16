package com.cloud.saveandsecure.dao;

import com.cloud.saveandsecure.model.Storage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StorageDao extends JpaRepository<Storage, Integer>{
    Storage findById(int id);
    Storage findByIdUser(int idUser);
}
