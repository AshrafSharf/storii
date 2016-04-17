package storii.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import storii.models.Page;

/**
 * Spring Data CrudRepository for the cracUser entity.
 */

@Transactional
public interface PageDAO extends CrudRepository<Page, Long>{
	 public Page findByTitle(String title);	
}
