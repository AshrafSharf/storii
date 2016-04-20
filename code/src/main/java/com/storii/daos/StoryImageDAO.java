package com.storii.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.storii.models.StoryImage;

/**
 * Spring Data CrudRepository for the cracUser entity.
 */

@Transactional
public interface StoryImageDAO extends CrudRepository<StoryImage, Long>{
	 public StoryImage findByName(String name);	
}
