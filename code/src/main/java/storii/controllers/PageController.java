package storii.controllers;

import java.io.IOException;

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

import storii.daos.PageDAO;
import storii.models.Page;

/**
 * REST controller for managing users.
 */

@RestController
@RequestMapping("/page")
public class PageController {

	@Autowired
	private PageDAO pageDAO;

	/**
	 * GET / or blank -> get all users.
	 */

	@RequestMapping(value = { "/", "" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> index() throws JsonProcessingException {
		Iterable<Page> pageList = pageDAO.findAll();
		ObjectMapper mapper = new ObjectMapper();
		return ResponseEntity.ok().body(mapper.writeValueAsString(pageList));
	}

	/**
	 * GET /{user_id} -> get the user with given ID.
	 */

	@RequestMapping(value = "/{page_id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> show(@PathVariable(value = "page_id") Long id) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		Page myPage = pageDAO.findOne(id);
		return ResponseEntity.ok().body(mapper.writeValueAsString(myPage));
	}

	/**
	 * POST / or blank -> create a new user.
	 */

	@RequestMapping(value = { "/",
			"" }, method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> create(@RequestBody String json) throws JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Page myPage = mapper.readValue(json, Page.class);

		return ResponseEntity.ok().body(
				"{\"page\":\"" + myPage.getId() + "\",\"name\":\"" + myPage.getTitle() + "\",\"created\":\"true\"}");

	}

	/**
	 * DELETE /{user_id} -> delete the user with given ID.
	 */

	@RequestMapping(value = "/{page_id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> destroy(@PathVariable(value = "page_id") Long id) {
		Page deletePage = pageDAO.findOne(id);
		long pageId = deletePage.getId();
		String userName = deletePage.getTitle();
		pageDAO.delete(deletePage);
		return ResponseEntity.ok()
				.body("{\"page\":\"" + pageId + "\",\"name\":\"" + userName + "\",\"deleted\":\"true\"}");

	}

	/**
	 * PUT /{user_id} -> update the user with given ID.
	 */

	@RequestMapping(value = "/{page_id}", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> update(@RequestBody String json, @PathVariable(value = "page_id") Long id)
			throws JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Page updatedPage = mapper.readValue(json, Page.class);
		Page oldPage = pageDAO.findOne(id);
		oldPage = updatedPage;
		pageDAO.save(oldPage);

		return ResponseEntity.ok().body("{\"page\":\"" + oldPage.getTitle() + "\",\"updated\":\"true\"}");

	}
}
