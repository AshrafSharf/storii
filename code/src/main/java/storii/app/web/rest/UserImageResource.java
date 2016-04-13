package storii.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import storii.app.domain.UserImage;
import storii.app.repository.UserImageRepository;
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
 * REST controller for managing UserImage.
 */
@RestController
@RequestMapping("/api")
public class UserImageResource {

    private final Logger log = LoggerFactory.getLogger(UserImageResource.class);
        
    @Inject
    private UserImageRepository userImageRepository;
    
    /**
     * POST  /userImages -> Create a new userImage.
     */
    @RequestMapping(value = "/userImages",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserImage> createUserImage(@RequestBody UserImage userImage) throws URISyntaxException {
        log.debug("REST request to save UserImage : {}", userImage);
        if (userImage.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("userImage", "idexists", "A new userImage cannot already have an ID")).body(null);
        }
        UserImage result = userImageRepository.save(userImage);
        return ResponseEntity.created(new URI("/api/userImages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("userImage", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /userImages -> Updates an existing userImage.
     */
    @RequestMapping(value = "/userImages",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserImage> updateUserImage(@RequestBody UserImage userImage) throws URISyntaxException {
        log.debug("REST request to update UserImage : {}", userImage);
        if (userImage.getId() == null) {
            return createUserImage(userImage);
        }
        UserImage result = userImageRepository.save(userImage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("userImage", userImage.getId().toString()))
            .body(result);
    }

    /**
     * GET  /userImages -> get all the userImages.
     */
    @RequestMapping(value = "/userImages",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<UserImage> getAllUserImages() {
        log.debug("REST request to get all UserImages");
        return userImageRepository.findAll();
            }

    /**
     * GET  /userImages/:id -> get the "id" userImage.
     */
    @RequestMapping(value = "/userImages/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserImage> getUserImage(@PathVariable Long id) {
        log.debug("REST request to get UserImage : {}", id);
        UserImage userImage = userImageRepository.findOne(id);
        return Optional.ofNullable(userImage)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /userImages/:id -> delete the "id" userImage.
     */
    @RequestMapping(value = "/userImages/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteUserImage(@PathVariable Long id) {
        log.debug("REST request to delete UserImage : {}", id);
        userImageRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userImage", id.toString())).build();
    }
}
