package storii.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import storii.app.domain.Story2;
import storii.app.repository.Story2Repository;
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
 * REST controller for managing Story2.
 */
@RestController
@RequestMapping("/api")
public class Story2Resource {

    private final Logger log = LoggerFactory.getLogger(Story2Resource.class);
        
    @Inject
    private Story2Repository story2Repository;
    
    /**
     * POST  /story2s -> Create a new story2.
     */
    @RequestMapping(value = "/story2s",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Story2> createStory2(@RequestBody Story2 story2) throws URISyntaxException {
        log.debug("REST request to save Story2 : {}", story2);
        if (story2.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("story2", "idexists", "A new story2 cannot already have an ID")).body(null);
        }
        Story2 result = story2Repository.save(story2);
        return ResponseEntity.created(new URI("/api/story2s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("story2", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /story2s -> Updates an existing story2.
     */
    @RequestMapping(value = "/story2s",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Story2> updateStory2(@RequestBody Story2 story2) throws URISyntaxException {
        log.debug("REST request to update Story2 : {}", story2);
        if (story2.getId() == null) {
            return createStory2(story2);
        }
        Story2 result = story2Repository.save(story2);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("story2", story2.getId().toString()))
            .body(result);
    }

    /**
     * GET  /story2s -> get all the story2s.
     */
    @RequestMapping(value = "/story2s",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Story2> getAllStory2s() {
        log.debug("REST request to get all Story2s");
        return story2Repository.findAll();
            }

    /**
     * GET  /story2s/:id -> get the "id" story2.
     */
    @RequestMapping(value = "/story2s/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Story2> getStory2(@PathVariable Long id) {
        log.debug("REST request to get Story2 : {}", id);
        Story2 story2 = story2Repository.findOne(id);
        return Optional.ofNullable(story2)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /story2s/:id -> delete the "id" story2.
     */
    @RequestMapping(value = "/story2s/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteStory2(@PathVariable Long id) {
        log.debug("REST request to delete Story2 : {}", id);
        story2Repository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("story2", id.toString())).build();
    }
}
