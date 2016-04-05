package storii.app.repository;

import storii.app.domain.Story2;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Story2 entity.
 */
public interface Story2Repository extends JpaRepository<Story2,Long> {

}
