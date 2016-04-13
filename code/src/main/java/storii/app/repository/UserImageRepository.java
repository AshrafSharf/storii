package storii.app.repository;

import storii.app.domain.UserImage;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserImage entity.
 */
public interface UserImageRepository extends JpaRepository<UserImage,Long> {

}
