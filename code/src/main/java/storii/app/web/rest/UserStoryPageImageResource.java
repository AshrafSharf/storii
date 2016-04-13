package storii.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import storii.app.domain.UserStoryPageImage;
import storii.app.repository.UserStoryPageImageRepository;
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
 * REST controller for managing UserStoryPageImage.
 */
@RestController
@RequestMapping("/api")
public class UserStoryPageImageResource {

    private final Logger log = LoggerFactory.getLogger(UserStoryPageImageResource.class);
        
    @Inject
    private UserStoryPageImageRepository userStoryPageImageRepository;
    
    /**
     * POST  /userStoryPageImages -> Create a new userStoryPageImage.
     */
    @RequestMapping(value = "/userStoryPageImages",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStoryPageImage> createUserStoryPageImage(@RequestBody UserStoryPageImage userStoryPageImage) throws URISyntaxException {
        log.debug("REST request to save UserStoryPageImage : {}", userStoryPageImage);
        if (userStoryPageImage.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("userStoryPageImage", "idexists", "A new userStoryPageImage cannot already have an ID")).body(null);
        }
        UserStoryPageImage result = userStoryPageImageRepository.save(userStoryPageImage);
        return ResponseEntity.created(new URI("/api/userStoryPageImages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("userStoryPageImage", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /userStoryPageImages -> Updates an existing userStoryPageImage.
     */
    @RequestMapping(value = "/userStoryPageImages",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStoryPageImage> updateUserStoryPageImage(@RequestBody UserStoryPageImage userStoryPageImage) throws URISyntaxException {
        log.debug("REST request to update UserStoryPageImage : {}", userStoryPageImage);
        if (userStoryPageImage.getId() == null) {
            return createUserStoryPageImage(userStoryPageImage);
        }
        UserStoryPageImage result = userStoryPageImageRepository.save(userStoryPageImage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("userStoryPageImage", userStoryPageImage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /userStoryPageImages -> get all the userStoryPageImages.
     */
    @RequestMapping(value = "/userStoryPageImages",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<UserStoryPageImage> getAllUserStoryPageImages() {
        log.debug("REST request to get all UserStoryPageImages");
        return userStoryPageImageRepository.findAll();
            }

    /**
     * GET  /userStoryPageImages/:id -> get the "id" userStoryPageImage.
     */
    @RequestMapping(value = "/userStoryPageImages/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserStoryPageImage> getUserStoryPageImage(@PathVariable Long id) {
        log.debug("REST request to get UserStoryPageImage : {}", id);
        UserStoryPageImage userStoryPageImage = userStoryPageImageRepository.findOne(id);
        return Optional.ofNullable(userStoryPageImage)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /userStoryPageImages/:id -> delete the "id" userStoryPageImage.
     */
    @RequestMapping(value = "/userStoryPageImages/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteUserStoryPageImage(@PathVariable Long id) {
        log.debug("REST request to delete UserStoryPageImage : {}", id);
        userStoryPageImageRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userStoryPageImage", id.toString())).build();
    }
}
