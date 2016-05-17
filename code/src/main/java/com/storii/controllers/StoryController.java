package com.storii.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.storii.daos.PageDAO;
import com.storii.daos.StoriiUserDAO;
import com.storii.daos.StoryDAO;
import com.storii.models.Page;
import com.storii.models.Rating;
import com.storii.models.StoriiUser;
import com.storii.models.Story;

/**
 * REST controller for managing users.
 */

@RestController
@RequestMapping("/story")
public class StoryController {

	@Autowired
	private StoryDAO storyDAO;

	@Autowired
	private StoriiUserDAO userDAO;

	@Autowired
	private PageDAO pageDAO;

	/**
	 * GET / or blank -> get all stories.
	 */

	@RequestMapping(value = { "/", "" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> index() throws JsonProcessingException {
		Iterable<Story> storyList = storyDAO.findAll();
		ObjectMapper mapper = new ObjectMapper();
		return ResponseEntity.ok().body("{\"data\":" + mapper.writeValueAsString(storyList) + "}");
	}

	/**
	 * GET /{user_id} -> get the story with given ID.
	 */

	@RequestMapping(value = "/{story_id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> show(@PathVariable(value = "story_id") Long id) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		Story myStory = storyDAO.findOne(id);
		return ResponseEntity.ok().body("{\"data\":" + mapper.writeValueAsString(myStory) + "}");
	}

	/**
	 * POST / or blank -> create a new story.
	 */
	@PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
	@RequestMapping(value = { "/",
			"" }, method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> create(@RequestBody String json) throws JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		StoriiUser myUser = userDAO.findByName(userDetails.getUsername());
		Story myStory = mapper.readValue(json, Story.class);
		Page firstPage = new Page(myStory);
		myStory.setFirstPage(firstPage);
		myStory.setParentUser(myUser);
		pageDAO.save(firstPage);
		storyDAO.save(myStory);

		return ResponseEntity.ok().body("{\"data\":" + "{\"story\":\"" + myStory.getId() + "\",\"name\":\""
				+ myStory.getName() + "\",\"created\":\"true\"}" + "}");

	}

	/**
	 * DELETE /{user_id} -> delete the story with given ID.
	 */

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/{story_id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> destroy(@PathVariable(value = "story_id") Long id) {
		Story deleteStory = storyDAO.findOne(id);
		long StoryId = deleteStory.getId();
		String userName = deleteStory.getName();
		storyDAO.delete(deleteStory);
		return ResponseEntity.ok().body("{\"data\":" + "{\"story\":\"" + StoryId + "\",\"name\":\"" + userName
				+ "\",\"deleted\":\"true\"}" + "}");

	}

	/**
	 * PUT /{user_id} -> update the story with given ID.
	 */

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/{story_id}", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> update(@RequestBody String json, @PathVariable(value = "story_id") Long id)
			throws JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Story updatedStory = mapper.readValue(json, Story.class);
		Story oldStory = storyDAO.findOne(id);

		if(!updatedStory.getName().equals("defaultName") && !updatedStory.getName().equals("")){
			oldStory.setName(updatedStory.getName());
		}

		if(!updatedStory.getAuthorName().equals("defaultAuthor") && !updatedStory.getAuthorName().equals("")){
			oldStory.setAuthorName(updatedStory.getAuthorName());
		}
		
		if(!updatedStory.getCoAuthorName().equals("defaultCoAuthor") && !updatedStory.getCoAuthorName().equals("")){
			oldStory.setCoAuthorName(updatedStory.getCoAuthorName());
		}
				
		storyDAO.save(oldStory);

		return ResponseEntity.ok()
				.body("{\"data\":" + "{\"story\":\"" + oldStory.getName() + "\",\"updated\":\"true\"}" + "}");

	}

	/**
	 * find stories by given name
	 * 
	 * @param story_name
	 * @return ResponseEntity
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "/findByName/{story_name}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> findByName(@PathVariable(value = "story_name") String story_name)
			throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		List<Story> myStoryList = storyDAO.findStoriesByNameContaining(story_name);
		return ResponseEntity.ok().body("{\"data\":" + mapper.writeValueAsString(myStoryList) + "}");
	}

	/**
	 * Pages are now created via this function
	 * 
	 * @param json
	 * @param story_id
	 * @return ResponseEntity
	 * @throws IOException
	 */
	@PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
	@RequestMapping(value = "/{story_id}/addPage", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> addPage(@RequestBody String json, @PathVariable(value = "story_id") Long story_id)
			throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		Story myStory = storyDAO.findOne(story_id);
		Page newPage = mapper.readValue(json, Page.class);
		newPage.setParentStory(myStory);
		pageDAO.save(newPage);
		return ResponseEntity.ok().body("{\"data\":" + "{\"created\":\"true\"}" + "}");
	}

	/**
	 * find pages by given story
	 * 
	 * @param story_id
	 * @return ResponseEntity
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "/{story_id}/getPages", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> getPages(@PathVariable(value = "story_id") Long story_id)
			throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		Story myStory = storyDAO.findOne(story_id);
		return ResponseEntity.ok().body("{\"data\":" + mapper.writeValueAsString(myStory.getPages()) + "}");
	}

	/**
	 * returns max level of given story
	 * 
	 * @param story_id
	 * @return ResponseEntity
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "/{story_id}/getMaxLevel", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> getMaxLevel(@PathVariable(value = "story_id") Long story_id)
			throws JsonProcessingException {
		Story myStory = storyDAO.findOne(story_id);
		Set<Page> myPages = myStory.getPages();

		int maxLevel = 0;

		for (Page thisPage : myPages) {
			if (thisPage.getLevel() > maxLevel) {
				maxLevel = thisPage.getLevel();
			}
		}

		maxLevel++;

		return ResponseEntity.ok().body("{\"data\":" + "{\"max_level\":\"" + maxLevel + "\"}" + "}");
	}
	
	@RequestMapping(value = "/{story_id}/publish", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> publish(@PathVariable(value = "story_id") Long story_id) {
		Story myStory = storyDAO.findOne(story_id);
		myStory.setPublished(true);
		storyDAO.save(myStory);
		return ResponseEntity.ok().body("{\"data\":" + "{\"story\":\"" + myStory.getName() + "\", \"published\":\"" + myStory.isPublished() + "\"}" + "}");
	}

	@RequestMapping(value = "/{story_id}/unpublish", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> unpublish(@PathVariable(value = "story_id") Long story_id) {
		Story myStory = storyDAO.findOne(story_id);
		myStory.setPublished(false);
		storyDAO.save(myStory);
		return ResponseEntity.ok().body("{\"data\":" + "{\"story\":\"" + myStory.getName() + "\", \"published\":\"" + myStory.isPublished() + "\"}" + "}");
	}

	@PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
	@RequestMapping(value = "/{story_id}/addRating", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> addRating(@RequestBody String json, @PathVariable(value = "story_id") Long story_id)
			throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		StoriiUser myUser = userDAO.findByName(userDetails.getUsername());
		Story myStory = storyDAO.findOne(story_id);
		
		Rating newRating = mapper.readValue(json, Rating.class);
		
		myUser.getRatings().add(newRating);
		newRating.setRatedStory(myStory);
		newRating.setRatingUser(myUser);
		storyDAO.save(myStory);
		
		return ResponseEntity.ok().body("{\"data\":" + "{\"created\":\"true\"}" + "}");
	}
}
