package com.storii.controllers;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.sql.Timestamp;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.storii.daos.StoriiUserDAO;
import com.storii.daos.UserImageDAO;
import com.storii.models.StoriiUser;
import com.storii.models.UserImage;


@RestController
@RequestMapping("/attachmentUl")
public class UploadController {

	@Autowired
	private UserImageDAO userImageDAO;
	
	@Autowired
	private StoriiUserDAO userDAO;

	@RequestMapping(value = "/addUserImage", headers = "content-type=multipart/*", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> addUserImage(@RequestParam("uploadfile") MultipartFile uploadfile) {

		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		StoriiUser myUser = userDAO.findByName(userDetails.getUsername());
		String filename = "";

		try {
			// Get the filename and build the local file path (be sure that the
			// application have write permissions on such directory)
			java.util.Date date = new java.util.Date();

			filename = new Timestamp(date.getTime()).hashCode() + uploadfile.getOriginalFilename();
			String directory = "uploadedFiles";
			String filepath = Paths.get(directory, filename).toString();

			// Save the file locally
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
			stream.write(uploadfile.getBytes());
			stream.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body("{\"uploaded\":\"false\"}");
		}
		
		UserImage newImage = new UserImage();
		newImage.setName("default");
		newImage.setPath(filename);
		newImage.setUserId(myUser);
		
		userImageDAO.save(newImage);

		return ResponseEntity.ok().body("{\"uploaded\":\"true\", \"img_name\":\"" + filename + "\"}");
	} // method uploadFile

	@RequestMapping(value = "/deleteUserImage/{user_image_id}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<String> deleteUserImage(@PathVariable(value = "user_image_id") Long user_image_id) {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		StoriiUser myUser = userDAO.findByName(userDetails.getUsername());

		UserImage image = userImageDAO.findOne(user_image_id);
		
		if(image.getUserId().getId() != myUser.getId()){
			return ResponseEntity.badRequest().body("{\"deleted\":\"false\", \"exception\":\"not_existing\"}");
		}
		
		String imgName = image.getPath();
		
		try {

			File file = new File("uploadedFiles/"+imgName);

			System.out.println(file.getAbsolutePath());
			
			if (file.delete()) {
				System.out.println(file.getName() + " is deleted!");
			} else {
				System.out.println("Delete operation is failed.");
			}

		} catch (Exception e) {

			e.printStackTrace();
			return ResponseEntity.badRequest().body("{\"deleted\":\"false\", \"exception\":\"delete_failed\"}");

		}
		
		userImageDAO.delete(image);
		
		return ResponseEntity.ok().body("{\"deleted\":\"true\", \"image_name\":\""+imgName+"\"}");

		//return ResponseEntity.badRequest().body("{\"deleted\":\"false\", \"exception\":\"delete_failed\"}");

	}

	
	/*
	@RequestMapping(value = "/changeFile/{attachment_id}", headers = "content-type=multipart/*", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> changeFile(@PathVariable(value = "attachment_id") Long attachment_id,
			@RequestParam("uploadfile") MultipartFile uploadfile) {

		Attachment myAtt = attachmentDAO.findOne(attachment_id);
		String filename = "";

		if (myAtt == null) {
			return ResponseEntity.badRequest().body("{\"uploaded\":\"false\", \"exception\":\"no_attachment\"}");
		}

		if (myAtt.getPath().equals("") || myAtt.getPath() == null) {
			return ResponseEntity.badRequest()
					.body("{\"uploaded\":\"false\", \"exception\":\"attachment_has_no_file\"}");
		}

		try {
			// Get the filename and build the local file path (be sure that the
			// application have write permissions on such directory)
			java.util.Date date = new java.util.Date();

			filename = new Timestamp(date.getTime()).hashCode()+ uploadfile.getOriginalFilename();
			String directory = "uploadedFiles";
			String filepath = Paths.get(directory, filename).toString();

			// Save the file locally
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
			stream.write(uploadfile.getBytes());
			stream.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body("{\"uploaded\":\"false\"}");
		}

		String oldFile = myAtt.getPath();

		try {

			File file = new File("uploadedFiles/"+oldFile);

			if (file.delete()) {
				System.out.println(file.getName() + " is deleted!");
			} else {
				System.out.println("Delete operation is failed.");
			}

		} catch (Exception e) {

			e.printStackTrace();
			return ResponseEntity.badRequest().body("{\"uploaded\":\"false\", \"exception\":\"error_deleting\"}");

		}

		myAtt.setPath(filename);
		attachmentDAO.save(myAtt);

		return ResponseEntity.ok().body("{\"uploaded\":\"true\", \"img_name\":\"" + filename + "\"}");
	} // method uploadFile
*/
}
