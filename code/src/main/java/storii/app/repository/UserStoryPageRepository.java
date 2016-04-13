package storii.app.repository;

import storii.app.domain.UserStoryPage;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserStoryPage entity.
 */
public interface UserStoryPageRepository extends JpaRepository<UserStoryPage,Long> {

}
