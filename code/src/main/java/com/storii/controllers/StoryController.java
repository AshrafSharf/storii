package com.storii.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.storii.daos.StoryDAO;
import com.storii.models.Story;

/**
 * REST controller for managing users.
 */

@RestController
@RequestMapping("/story")
public class StoryController {

	@Autowired
	private StoryDAO storyDAO;

	/**
	 * GET / or blank -> get all users.
	 */

	@RequestMapping(value = { "/", "" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> index() throws JsonProcessingException {
		Iterable<Story> storyList = storyDAO.findAll();
		ObjectMapper mapper = new ObjectMapper();
		return ResponseEntity.ok().body("{\"data\":"+mapper.writeValueAsString(storyList)+"}");
	}

	/**
	 * GET /{user_id} -> get the user with given ID.
	 */

	@RequestMapping(value = "/{story_id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> show(@PathVariable(value = "story_id") Long id) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		Story myStory = storyDAO.findOne(id);
		return ResponseEntity.ok().body("{\"data\":"+mapper.writeValueAsString(myStory)+"}");
	}

	/**
	 * POST / or blank -> create a new user.
	 */

	@RequestMapping(value = { "/",
			"" }, method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> create(@RequestBody String json) throws JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Story myStory = mapper.readValue(json, Story.class);

		return ResponseEntity.ok().body(
				"{\"data\":"+"{\"story\":\"" + myStory.getId() + "\",\"name\":\"" + myStory.getName() + "\",\"created\":\"true\"}"+"}");

	}

	/**
	 * DELETE /{user_id} -> delete the user with given ID.
	 */

	@RequestMapping(value = "/{story_id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> destroy(@PathVariable(value = "story_id") Long id) {
		Story deleteStory = storyDAO.findOne(id);
		long StoryId = deleteStory.getId();
		String userName = deleteStory.getName();
		storyDAO.delete(deleteStory);
		return ResponseEntity.ok()
				.body("{\"data\":"+"{\"story\":\"" + StoryId + "\",\"name\":\"" + userName + "\",\"deleted\":\"true\"}"+"}");

	}

	/**
	 * PUT /{user_id} -> update the user with given ID.
	 */

	@RequestMapping(value = "/story_id}", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> update(@RequestBody String json, @PathVariable(value = "story_id") Long id)
			throws JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Story updatedStory = mapper.readValue(json, Story.class);
		Story oldStory = storyDAO.findOne(id);
		oldStory = updatedStory;
		storyDAO.save(oldStory);

		return ResponseEntity.ok().body("{\"data\":"+"{\"story\":\"" + oldStory.getName() + "\",\"updated\":\"true\"}"+"}");

	}
	
	/**
	 * find stories by given name
	 * @param story_name
	 * @return ResponseEntity
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "/findByName/{story_name}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> findByName(@PathVariable(value = "story_name") String story_name) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		List<Story> myStoryList = storyDAO.findStoriesByNameContaining(story_name);
		return ResponseEntity.ok().body("{\"data\":"+mapper.writeValueAsString(myStoryList)+"}");
	}
	
}
