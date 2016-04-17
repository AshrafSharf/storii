package storii.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import storii.models.PageImage;

/**
 * Spring Data CrudRepository for the cracUser entity.
 */

@Transactional
public interface PageImageDAO extends CrudRepository<PageImage, Long>{
	 public PageImage findByName(String name);	
}
