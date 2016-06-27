package com.storii.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.storii.daos.StoriiUserDAO;
import com.storii.daos.UserImageDAO;
import com.storii.models.StoriiUser;
import com.storii.models.Story;
import com.storii.models.UserImage;

/**
 * REST controller for managing users.
 */

@RestController
@RequestMapping("/user")
public class StoriiUserController {

	@Autowired
	private StoriiUserDAO userDAO;

	@Autowired
	private UserImageDAO userImageDAO;


	/**
	 * GET / or blank -> get all users.
	 */
	@RequestMapping(value = { "/", "" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> index() throws JsonProcessingException {
		Iterable<StoriiUser> userList = userDAO.findAll();
		ObjectMapper mapper = new ObjectMapper();
		return ResponseEntity.ok().body("{\"data\":"+mapper.writeValueAsString(userList)+"}");
	}

	/**
	 * GET /{user_id} -> get the user with given ID.
	 */

	@RequestMapping(value = "/{user_id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> show(@PathVariable(value = "user_id") Long id) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		StoriiUser myUser = userDAO.findOne(id);
		return ResponseEntity.ok().body("{\"data\":"+mapper.writeValueAsString(myUser)+"}");
	}

	/**
	 * POST / or blank -> create a new user.
	 */

	@RequestMapping(value = { "/", "" }, method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> create(@RequestBody String json) throws JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		StoriiUser myUser = mapper.readValue(json, StoriiUser.class);
		
		BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();
		myUser.setPassword(bcryptEncoder.encode(myUser.getPassword()));
		
		if (userDAO.findByName(myUser.getName()) == null) {
			userDAO.save(myUser);
		} else {
			return ResponseEntity.ok().body("{\"data\":"+"{\"created\":\"false\", \"exception\":\"name already exists\"}"+"}");
		}

		return ResponseEntity.ok().body(
				"{\"data\":"+"{\"user\":\"" + myUser.getId() + "\",\"name\":\"" + myUser.getName() + "\",\"created\":\"true\"}"+"}");

	}

	/**
	 * DELETE /{user_id} -> delete the user with given ID.
	 */

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/{user_id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> destroy(@PathVariable(value = "user_id") Long id) {
		StoriiUser deleteUser = userDAO.findOne(id);
		long userId = deleteUser.getId();
		String userName = deleteUser.getName();
		userDAO.delete(deleteUser);
		return ResponseEntity.ok()
				.body("{\"data\":"+"{\"user\":\"" + userId + "\",\"name\":\"" + userName + "\",\"deleted\":\"true\"}"+"}");

	}

	/**
	 * PUT /{user_id} -> update the user with given ID.
	 */

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/{user_id}", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> update(@RequestBody String json, @PathVariable(value = "user_id") Long id)
			throws JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		StoriiUser updatedUser = mapper.readValue(json, StoriiUser.class);
		StoriiUser oldUser = userDAO.findOne(id);

		if (updatedUser.getName() != null) {
			oldUser.setName(updatedUser.getName());
		}
		
		BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();

		
		if (updatedUser.getPassword() != null) {
			oldUser.setPassword(bcryptEncoder.encode(updatedUser.getPassword()));
		}

		if (updatedUser.getEmail() != null) {
			oldUser.setEmail(updatedUser.getEmail());
		}
		
		if (updatedUser.getAboutMe() != null) {
			oldUser.setAboutMe(updatedUser.getAboutMe());
		}

		if (updatedUser.getMyInspiration() != null) {
			oldUser.setMyInspiration(updatedUser.getMyInspiration());
		}
		
		userDAO.save(oldUser);

		return ResponseEntity.ok().body("{\"user\":\"" + oldUser.getName() + "\",\"updated\":\"true\"}");

	}

	/**
	 * GET /me -> get the logged-in user.
	 */

	@PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
	@RequestMapping(value = "/me", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> getLogged() throws JsonProcessingException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		StoriiUser myUser = userDAO.findByName(userDetails.getUsername());
		ObjectMapper mapper = new ObjectMapper();
		return ResponseEntity.ok().body("{\"data\":"+mapper.writeValueAsString(myUser)+"}");
	}
	
	/**
	 * find users by given name
	 * @param user_name
	 * @return ResponseEntity
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "/findByName/{user_name}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> findByName(@PathVariable(value = "user_name") String user_name) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		List<StoriiUser> myUserList = userDAO.findUserssByNameContaining(user_name);
		return ResponseEntity.ok().body("{\"data\":"+mapper.writeValueAsString(myUserList)+"}");
	}
	
	/**
	 * find single user by given name
	 * @param user_name
	 * @return ResponseEntity
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "/findByNameSingle/{user_name}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> findByNameSingle(@PathVariable(value = "user_name") String user_name) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		StoriiUser myUser = userDAO.findUserByName(user_name);
		return ResponseEntity.ok().body("{\"data\":"+mapper.writeValueAsString(myUser)+"}");
	}
	
	/**
	 * returns a json if the logged in user is valid
	 * @return ResponseEntity
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> login() throws JsonMappingException, IOException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		StoriiUser myUser = userDAO.findByName(userDetails.getUsername());
		return ResponseEntity.ok().body(
				"{\"user\":\"" + myUser.getId() + "\",\"name\":\"" + myUser.getName() + "\",\"login\":\"true\"}");

	}
	
	/**
	 * find stories by given user
	 * 
	 * @param user_id
	 * @return ResponseEntity
	 * @throws JsonProcessingException
	 */
	@RequestMapping(value = "/{user_id}/getStories", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> getStories(@PathVariable(value = "user_id") Long user_id)
			throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		StoriiUser myUser = userDAO.findOne(user_id);
		return ResponseEntity.ok().body("{\"data\":" + mapper.writeValueAsString(myUser.getStories()) + "}");
	}
	
	@RequestMapping(value = "/{user_id}/publish", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> publish(@PathVariable(value = "user_id") Long user_id) {
		StoriiUser myUser = userDAO.findOne(user_id);
		myUser.setTutorialDone(true);
		userDAO.save(myUser);
		return ResponseEntity.ok().body("{\"data\":" + "{\"story\":\"" + myUser.getName() + "\", \"published\":\"" + myUser.getTutorialDone() + "\"}" + "}");
	}

	@RequestMapping(value = "/{user_id}/unpublish", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> unpublish(@PathVariable(value = "user_id") Long user_id) {
		StoriiUser myUser = userDAO.findOne(user_id);
		myUser.setTutorialDone(false);
		userDAO.save(myUser);
		return ResponseEntity.ok().body("{\"data\":" + "{\"story\":\"" + myUser.getName() + "\", \"published\":\"" + myUser.getTutorialDone() + "\"}" + "}");
	}
	
	@PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
	@RequestMapping(value = "/updateMe", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> updateMe(@RequestBody String json)
			throws JsonMappingException, IOException {
		
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		ObjectMapper mapper = new ObjectMapper();
		StoriiUser updatedUser = mapper.readValue(json, StoriiUser.class);
		StoriiUser oldUser = userDAO.findByName(userDetails.getUsername());

		if (updatedUser.getName() != null) {
			oldUser.setName(updatedUser.getName());
		}
		
		BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();

		
		if (updatedUser.getPassword() != null) {
			oldUser.setPassword(bcryptEncoder.encode(updatedUser.getPassword()));
		}

		if (updatedUser.getEmail() != null) {
			oldUser.setEmail(updatedUser.getEmail());
		}
		
		if (updatedUser.getAboutMe() != null) {
			oldUser.setAboutMe(updatedUser.getAboutMe());
		}

		if (updatedUser.getMyInspiration() != null) {
			oldUser.setMyInspiration(updatedUser.getMyInspiration());
		}
		
		userDAO.save(oldUser);

		return ResponseEntity.ok().body("{\"data\":" + "{\"user\":\"" + oldUser.getName() + "\",\"updated\":\"true\"}" + "}");

	}

	@RequestMapping(value = "/setPic/{img_id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> setAsProfilePic(@PathVariable(value = "img_id") long img_id) {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		StoriiUser user = userDAO.findByName(userDetails.getUsername());

		UserImage image = userImageDAO.findOne(img_id);
		
		//user.setSetUserImage(image);
		
		UserImage previous = user.getSetUserImage();
		
		if(previous != null){
			previous.setUserIdSet(null);
			userImageDAO.save(previous);
		}
		
		
		image.setUserIdSet(user);
		
		userImageDAO.save(image);
		
		return ResponseEntity.ok().body("{\"data\":" + "{\"user\":\"" + user.getName() + "\",\"image_change\":\"true\"}" + "}");
	}


}
