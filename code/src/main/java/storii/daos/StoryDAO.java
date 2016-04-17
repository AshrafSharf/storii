package storii.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import storii.models.Story;

/**
 * Spring Data CrudRepository for the cracUser entity.
 */

@Transactional
public interface StoryDAO extends CrudRepository<Story, Long>{
	 public Story findByName(String name);	
}
