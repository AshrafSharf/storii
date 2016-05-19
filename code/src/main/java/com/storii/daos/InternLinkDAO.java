package com.storii.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.storii.models.InternLink;

/**
 * Spring Data CrudRepository for the cracUser entity.
 */

@Transactional
public interface InternLinkDAO extends CrudRepository<InternLink, Long>{
}
