package com.storii.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
import com.storii.models.StoriiUser;
import com.storii.models.Story;

/**
 * REST controller for managing users.
 */

@RestController
@RequestMapping("/user")
public class StoriiUserController {

	@Autowired
	private StoriiUserDAO userDAO;


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

	@RequestMapping(value = "/{user_id}", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> update(@RequestBody String json, @PathVariable(value = "user_id") Long id)
			throws JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		StoriiUser updatedUser = mapper.readValue(json, StoriiUser.class);
		StoriiUser oldUser = userDAO.findOne(id);

		String oldName = oldUser.getName();
		if (updatedUser.getName() != null) {
			oldUser.setName(updatedUser.getName());
		}
		if (updatedUser.getPassword() != null) {
			oldUser.setPassword(updatedUser.getPassword());
		}

		userDAO.save(oldUser);

		return ResponseEntity.ok().body("{\"data\":"+"{\"user\":\"" + oldUser.getId() + "\",\"old_name\":\"" + oldName
				+ "\",\"new_name\":\"" + oldUser.getName() + "\",\"updated\":\"true\"}"+"}");

	}

	/**
	 * GET /me -> get the logged-in user.
	 */

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

}
