package com.storii.daos;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.storii.models.Story;

/**
 * Spring Data CrudRepository for the cracUser entity.
 */

@Transactional
public interface StoryDAO extends CrudRepository<Story, Long>{
	 public Story findByName(String name);	
	 public List<Story> findStoriesByNameContaining(String name);
}
