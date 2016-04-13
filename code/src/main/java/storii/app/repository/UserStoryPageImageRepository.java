package storii.app.repository;

import storii.app.domain.UserStoryPageImage;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserStoryPageImage entity.
 */
public interface UserStoryPageImageRepository extends JpaRepository<UserStoryPageImage,Long> {

}
