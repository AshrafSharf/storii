package com.storii.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.storii.daos.InternLinkDAO;
import com.storii.daos.PageDAO;
import com.storii.models.InternLink;
import com.storii.models.Page;

/**
 * REST controller for managing users.
 */

@RestController
@RequestMapping("/page")
public class PageController {

	@Autowired
	private PageDAO pageDAO;
	
	@Autowired
	private InternLinkDAO internLinkDAO;


	/**
	 * GET / or blank -> get all users.
	 */

	@RequestMapping(value = { "/", "" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> index() throws JsonProcessingException {
		Iterable<Page> pageList = pageDAO.findAll();
		ObjectMapper mapper = new ObjectMapper();
		return ResponseEntity.ok().body("{\"data\":"+mapper.writeValueAsString(pageList)+"}");
	}

	/**
	 * GET /{user_id} -> get the user with given ID.
	 */

	@RequestMapping(value = "/{page_id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> show(@PathVariable(value = "page_id") Long id) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		Page myPage = pageDAO.findOne(id);
		return ResponseEntity.ok().body("{\"data\":"+mapper.writeValueAsString(myPage)+"}");
	}

	/**
	 * POST / or blank -> create a new user.
	 */
	/*
	 * @RequestMapping(value = { "/", "" }, method = RequestMethod.POST,
	 * produces = "application/json", consumes = "application/json")
	 * 
	 * @ResponseBody public ResponseEntity<String> create(@RequestBody String
	 * json) throws JsonMappingException, IOException { ObjectMapper mapper =
	 * new ObjectMapper(); Page myPage = mapper.readValue(json, Page.class);
	 * 
	 * return ResponseEntity.ok().body( "{\"page\":\"" + myPage.getId() +
	 * "\",\"name\":\"" + myPage.getTitle() + "\",\"created\":\"true\"}");
	 * 
	 * }
	 */
	/**
	 * DELETE /{user_id} -> delete the user with given ID.
	 */

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/{page_id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> destroy(@PathVariable(value = "page_id") Long id) {
		Page deletePage = pageDAO.findOne(id);
		long pageId = deletePage.getId();
		String userName = deletePage.getTitle();
		pageDAO.delete(deletePage);
		return ResponseEntity.ok()
				.body("{\"data\":"+"{\"page\":\"" + pageId + "\",\"name\":\"" + userName + "\",\"deleted\":\"true\"}"+"}");

	}

	/**
	 * PUT /{user_id} -> update the user with given ID.
	 */

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/{page_id}", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> update(@RequestBody String json, @PathVariable(value = "page_id") Long id)
			throws JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Page updatedPage = mapper.readValue(json, Page.class);
		Page oldPage = pageDAO.findOne(id);
		
		if(!updatedPage.getTitle().equals("defaultTitle") && !updatedPage.getTitle().equals("")){
			oldPage.setTitle(updatedPage.getTitle());
		}
		
		if(!updatedPage.getDescription().equals("defaultDescription") && !updatedPage.getDescription().equals("")){
			oldPage.setDescription(updatedPage.getDescription());
		}
		
		if(updatedPage.getLevel() != -1){
			oldPage.setLevel(updatedPage.getLevel());
		}
		
		if(updatedPage.getPosition() != -1){
			oldPage.setPosition(updatedPage.getPosition());
		}
		
		if(!updatedPage.getSerializedContent().equals("")){
			oldPage.setSerializedContent(updatedPage.getSerializedContent());
		}
		
		pageDAO.save(oldPage);

		return ResponseEntity.ok().body("{\"data\":"+"{\"page\":\"" + oldPage.getTitle() + "\",\"updated\":\"true\"}"+"}");

	}
	
	@RequestMapping(value = "/{page_id}/addInternLink/{next_page_id}", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> addInternLink(@RequestBody String json, @PathVariable(value = "page_id") Long page_id, @PathVariable(value = "next_page_id") Long next_page_id) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		InternLink myLink = mapper.readValue(json, InternLink.class);
		myLink.setOwningPage(pageDAO.findOne(page_id));
		myLink.setNextPage(pageDAO.findOne(next_page_id));
		internLinkDAO.save(myLink);
		return ResponseEntity.ok().body("{\"data\":"+"{\"link\":\"safed\"}"+"}");
	}
	
	@RequestMapping(value = "/{page_id}/swapWith/{target_page_id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> swapWith(@PathVariable(value = "page_id") Long page_id, @PathVariable(value = "target_page_id") Long target_page_id) {
		Page page1 = pageDAO.findOne(page_id);
		Page page2 = pageDAO.findOne(target_page_id);
		
		Page dummy = page1.cloneForSwap();
		
		//actions on page1
		
		page1.setLevel(page2.getLevel());
		page1.setPosition(page2.getPosition());
		
		page1.getIncomingInternLinks().clear();
		
		for(InternLink link : page2.getIncomingInternLinks()){
			page1.getIncomingInternLinks().add(link);
			link.setNextPage(page1);
			internLinkDAO.save(link);
		}
		
		page1.getOutgoingInternLinks().clear();
		
		for(InternLink link : page2.getOutgoingInternLinks()){
			page1.getOutgoingInternLinks().add(link);
			link.setOwningPage(page1);
			internLinkDAO.save(link);
		}
		
		//actions on page2
		
		page2.setLevel(dummy.getLevel());
		page2.setPosition(dummy.getPosition());
		
		page2.getIncomingInternLinks().clear();
		
		for(InternLink link : dummy.getIncomingInternLinks()){
			page2.getIncomingInternLinks().add(link);
			link.setNextPage(page2);
			internLinkDAO.save(link);
		}
		
		page2.getOutgoingInternLinks().clear();
		
		for(InternLink link : dummy.getOutgoingInternLinks()){
			page2.getOutgoingInternLinks().add(link);
			link.setOwningPage(page2);
			internLinkDAO.save(link);
		}
		
		pageDAO.save(page1);
		pageDAO.save(page2);
		
		return ResponseEntity.ok().body("{\"data\":"+"{\"swapped\":\"true\",\"link1\": \""+page_id+"\",\"link2\": \""+target_page_id+"\"}"+"}");
	}
	
	@RequestMapping(value = "/{page_id}/swapWithBranch/{target_page_id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<String> swapWithBranch(@PathVariable(value = "page_id") Long page_id, @PathVariable(value = "target_page_id") Long target_page_id) {
		Page page1 = pageDAO.findOne(page_id);
		Page page2 = pageDAO.findOne(target_page_id);
		
		Page dummy = page1.cloneForSwap();
		
		int LvlIndicatorForPage1 = page2.getLevel() - page1.getLevel();
		int LvlIndicatorForPage2 = page1.getLevel() - page2.getLevel();
		
		//actions on page1
		
		page1.setPosition(page2.getPosition());
		
		page1.adjustBranchLevel(LvlIndicatorForPage1);
	
		page1.getIncomingInternLinks().clear();
		
		for(InternLink link : page2.getIncomingInternLinks()){
			page1.getIncomingInternLinks().add(link);
			link.setNextPage(page1);
			internLinkDAO.save(link);
		}
		
		//actions on page2
		
		page2.setPosition(dummy.getPosition());
		
		page2.adjustBranchLevel(LvlIndicatorForPage2);
		
		page2.getIncomingInternLinks().clear();
		
		for(InternLink link : dummy.getIncomingInternLinks()){
			page2.getIncomingInternLinks().add(link);
			link.setNextPage(page2);
			internLinkDAO.save(link);
		}
		
		pageDAO.save(page1);
		pageDAO.save(page2);
		
		return ResponseEntity.ok().body("{\"data\":"+"{\"swapped\":\"true\",\"link1\": \""+page_id+"\",\"link2\": \""+target_page_id+"\"}"+"}");
	}


}
