package storii.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import storii.app.domain.UserStory;
import storii.app.repository.UserStoryRepository;
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
 * REST controller for managing UserStory.
 */
@RestController
@RequestMapping("/api")
public class UserStoryResource {

    private final Logger log = LoggerFactory.getLogger(UserStoryResource.class);
        
    @Inject
    private UserStoryRepository userStoryRepository;
    
    /**
     * POST  /userStorys -> Create a new userStory.
     */
    @RequestMapping(value = "/userStorys",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStory> createUserStory(@RequestBody UserStory userStory) throws URISyntaxException {
        log.debug("REST request to save UserStory : {}", userStory);
        if (userStory.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("userStory", "idexists", "A new userStory cannot already have an ID")).body(null);
        }
        UserStory result = userStoryRepository.save(userStory);
        return ResponseEntity.created(new URI("/api/userStorys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("userStory", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /userStorys -> Updates an existing userStory.
     */
    @RequestMapping(value = "/userStorys",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStory> updateUserStory(@RequestBody UserStory userStory) throws URISyntaxException {
        log.debug("REST request to update UserStory : {}", userStory);
        if (userStory.getId() == null) {
            return createUserStory(userStory);
        }
        UserStory result = userStoryRepository.save(userStory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("userStory", userStory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /userStorys -> get all the userStorys.
     */
    @RequestMapping(value = "/userStorys",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<UserStory> getAllUserStorys() {
        log.debug("REST request to get all UserStorys");
        return userStoryRepository.findAll();
            }

    /**
     * GET  /userStorys/:id -> get the "id" userStory.
     */
    @RequestMapping(value = "/userStorys/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStory> getUserStory(@PathVariable Long id) {
        log.debug("REST request to get UserStory : {}", id);
        UserStory userStory = userStoryRepository.findOne(id);
        return Optional.ofNullable(userStory)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /userStorys/:id -> delete the "id" userStory.
     */
    @RequestMapping(value = "/userStorys/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteUserStory(@PathVariable Long id) {
        log.debug("REST request to delete UserStory : {}", id);
        userStoryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userStory", id.toString())).build();
    }
}
