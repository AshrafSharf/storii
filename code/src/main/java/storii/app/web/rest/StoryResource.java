package storii.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import storii.app.domain.Story;
import storii.app.repository.StoryRepository;
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
 * REST controller for managing Story.
 */
@RestController
@RequestMapping("/api")
public class StoryResource {

    private final Logger log = LoggerFactory.getLogger(StoryResource.class);
        
    @Inject
    private StoryRepository storyRepository;
    
    /**
     * POST  /storys -> Create a new story.
     */
    @RequestMapping(value = "/storys",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Story> createStory(@RequestBody Story story) throws URISyntaxException {
        log.debug("REST request to save Story : {}", story);
        if (story.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("story", "idexists", "A new story cannot already have an ID")).body(null);
        }
        Story result = storyRepository.save(story);
        return ResponseEntity.created(new URI("/api/storys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("story", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /storys -> Updates an existing story.
     */
    @RequestMapping(value = "/storys",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Story> updateStory(@RequestBody Story story) throws URISyntaxException {
        log.debug("REST request to update Story : {}", story);
        if (story.getId() == null) {
            return createStory(story);
        }
        Story result = storyRepository.save(story);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("story", story.getId().toString()))
            .body(result);
    }

    /**
     * GET  /storys -> get all the storys.
     */
    @RequestMapping(value = "/storys",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Story> getAllStorys() {
        log.debug("REST request to get all Storys");
        return storyRepository.findAll();
            }

    /**
     * GET  /storys/:id -> get the "id" story.
     */
    @RequestMapping(value = "/storys/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Story> getStory(@PathVariable Long id) {
        log.debug("REST request to get Story : {}", id);
        Story story = storyRepository.findOne(id);
        return Optional.ofNullable(story)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /storys/:id -> delete the "id" story.
     */
    @RequestMapping(value = "/storys/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        log.debug("REST request to delete Story : {}", id);
        storyRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("story", id.toString())).build();
    }
}
