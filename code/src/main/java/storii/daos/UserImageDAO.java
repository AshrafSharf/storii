package storii.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import storii.models.StoriiUser;
import storii.models.UserImage;

/**
 * Spring Data CrudRepository for the cracUser entity.
 */

@Transactional
public interface UserImageDAO extends CrudRepository<UserImage, Long>{
	 public UserImage findByName(String name);	
}
