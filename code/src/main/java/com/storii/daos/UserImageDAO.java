package com.storii.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.storii.models.UserImage;

/**
 * Spring Data CrudRepository for the cracUser entity.
 */

@Transactional
public interface UserImageDAO extends CrudRepository<UserImage, Long>{
	 public UserImage findByName(String name);
	 public UserImage findByPath(String path);
}
