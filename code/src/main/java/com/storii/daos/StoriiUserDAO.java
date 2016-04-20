package com.storii.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.storii.models.StoriiUser;

/**
 * Spring Data CrudRepository for the cracUser entity.
 */

@Transactional
public interface StoriiUserDAO extends CrudRepository<StoriiUser, Long>{
	 public StoriiUser findByName(String name);	
}
