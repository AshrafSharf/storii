package storii.app.repository;

import storii.app.domain.UserStory;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserStory entity.
 */
public interface UserStoryRepository extends JpaRepository<UserStory,Long> {

}
