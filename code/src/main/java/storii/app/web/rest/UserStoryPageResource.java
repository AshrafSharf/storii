package storii.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import storii.app.domain.UserStoryPage;
import storii.app.repository.UserStoryPageRepository;
import storii.app.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserStoryPage.
 */
@RestController
@RequestMapping("/api")
public class UserStoryPageResource {

    private final Logger log = LoggerFactory.getLogger(UserStoryPageResource.class);
        
    @Inject
    private UserStoryPageRepository userStoryPageRepository;
    
    /**
     * POST  /userStoryPages -> Create a new userStoryPage.
     */
    @RequestMapping(value = "/userStoryPages",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStoryPage> createUserStoryPage(@RequestBody UserStoryPage userStoryPage) throws URISyntaxException {
        log.debug("REST request to save UserStoryPage : {}", userStoryPage);
        if (userStoryPage.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("userStoryPage", "idexists", "A new userStoryPage cannot already have an ID")).body(null);
        }
        UserStoryPage result = userStoryPageRepository.save(userStoryPage);
        return ResponseEntity.created(new URI("/api/userStoryPages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("userStoryPage", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /userStoryPages -> Updates an existing userStoryPage.
     */
    @RequestMapping(value = "/userStoryPages",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStoryPage> updateUserStoryPage(@RequestBody UserStoryPage userStoryPage) throws URISyntaxException {
        log.debug("REST request to update UserStoryPage : {}", userStoryPage);
        if (userStoryPage.getId() == null) {
            return createUserStoryPage(userStoryPage);
        }
        UserStoryPage result = userStoryPageRepository.save(userStoryPage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("userStoryPage", userStoryPage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /userStoryPages -> get all the userStoryPages.
     */
    @RequestMapping(value = "/userStoryPages",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<UserStoryPage> getAllUserStoryPages() {
        log.debug("REST request to get all UserStoryPages");
        return userStoryPageRepository.findAll();
            }

    /**
     * GET  /userStoryPages/:id -> get the "id" userStoryPage.
     */
    @RequestMapping(value = "/userStoryPages/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStoryPage> getUserStoryPage(@PathVariable Long id) {
        log.debug("REST request to get UserStoryPage : {}", id);
        UserStoryPage userStoryPage = userStoryPageRepository.findOne(id);
        return Optional.ofNullable(userStoryPage)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /userStoryPages/:id -> delete the "id" userStoryPage.
     */
    @RequestMapping(value = "/userStoryPages/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteUserStoryPage(@PathVariable Long id) {
        log.debug("REST request to delete UserStoryPage : {}", id);
        userStoryPageRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userStoryPage", id.toString())).build();
    }
}
