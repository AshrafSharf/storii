package com.storii.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.storii.models.PageImage;

/**
 * Spring Data CrudRepository for the cracUser entity.
 */

@Transactional
public interface PageImageDAO extends CrudRepository<PageImage, Long>{
	 public PageImage findByName(String name);	
}
