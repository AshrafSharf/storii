package com.storii.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.persistence.JoinColumn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

/**
 * The cracUser-entity.
 */

@Entity
@Table(name = "users")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class StoriiUser {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Autowired
	@Column(name = "user_id")
	private long id;

	@NotNull
	@Autowired
	private String name;

	@NotNull
	@Autowired
	private String password;

	@NotNull
	@Autowired
	private String email;

	@NotNull
	@Autowired
	@Column(name = "tutorial_done")
	private Boolean tutorialDone;

	
	/**
	 * defines a one to many relation with the userImage-entity
	 */

	@OneToOne(mappedBy = "userId", cascade = CascadeType.ALL)
	private UserImage userImage;
	
	/**
	 * defines a one to many relation with the task-entity
	 */

	@Autowired
	@OneToMany(mappedBy = "parentUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Story> stories;


	/**
	 * constructors
	 */
	
	public StoriiUser(String name, String password, String email, Boolean tutorialDone) {
		this.name = name;
		this.password = password;
		this.email = email;
		this.tutorialDone = tutorialDone;
	}

	public StoriiUser() {
		this.name = "";
		this.password = "";
		this.email = "";
		this.tutorialDone = false;
	}
	
	/**
	 * getters and setters
	 */

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();
		this.password = bcryptEncoder.encode(password);
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getTutorialDone() {
		return tutorialDone;
	}

	public void setTutorialDone(Boolean tutorialDone) {
		this.tutorialDone = tutorialDone;
	}

	public UserImage getUserImage() {
		return userImage;
	}

	public void setUserImage(UserImage userImage) {
		this.userImage = userImage;
	}
	
	
	

}
