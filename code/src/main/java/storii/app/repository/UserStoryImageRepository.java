package storii.app.repository;

import storii.app.domain.UserStoryImage;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserStoryImage entity.
 */
public interface UserStoryImageRepository extends JpaRepository<UserStoryImage,Long> {

}
