package storii.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import storii.app.domain.UserStoryImage;
import storii.app.repository.UserStoryImageRepository;
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
 * REST controller for managing UserStoryImage.
 */
@RestController
@RequestMapping("/api")
public class UserStoryImageResource {

    private final Logger log = LoggerFactory.getLogger(UserStoryImageResource.class);
        
    @Inject
    private UserStoryImageRepository userStoryImageRepository;
    
    /**
     * POST  /userStoryImages -> Create a new userStoryImage.
     */
    @RequestMapping(value = "/userStoryImages",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStoryImage> createUserStoryImage(@RequestBody UserStoryImage userStoryImage) throws URISyntaxException {
        log.debug("REST request to save UserStoryImage : {}", userStoryImage);
        if (userStoryImage.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("userStoryImage", "idexists", "A new userStoryImage cannot already have an ID")).body(null);
        }
        UserStoryImage result = userStoryImageRepository.save(userStoryImage);
        return ResponseEntity.created(new URI("/api/userStoryImages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("userStoryImage", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /userStoryImages -> Updates an existing userStoryImage.
     */
    @RequestMapping(value = "/userStoryImages",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStoryImage> updateUserStoryImage(@RequestBody UserStoryImage userStoryImage) throws URISyntaxException {
        log.debug("REST request to update UserStoryImage : {}", userStoryImage);
        if (userStoryImage.getId() == null) {
            return createUserStoryImage(userStoryImage);
        }
        UserStoryImage result = userStoryImageRepository.save(userStoryImage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("userStoryImage", userStoryImage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /userStoryImages -> get all the userStoryImages.
     */
    @RequestMapping(value = "/userStoryImages",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<UserStoryImage> getAllUserStoryImages() {
        log.debug("REST request to get all UserStoryImages");
        return userStoryImageRepository.findAll();
            }

    /**
     * GET  /userStoryImages/:id -> get the "id" userStoryImage.
     */
    @RequestMapping(value = "/userStoryImages/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStoryImage> getUserStoryImage(@PathVariable Long id) {
        log.debug("REST request to get UserStoryImage : {}", id);
        UserStoryImage userStoryImage = userStoryImageRepository.findOne(id);
        return Optional.ofNullable(userStoryImage)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /userStoryImages/:id -> delete the "id" userStoryImage.
     */
    @RequestMapping(value = "/userStoryImages/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteUserStoryImage(@PathVariable Long id) {
        log.debug("REST request to delete UserStoryImage : {}", id);
        userStoryImageRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userStoryImage", id.toString())).build();
    }
}
