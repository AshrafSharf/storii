package com.storii.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
	@Column(name = "user_id")
	private long id;

	@NotNull
	private String name;

	@NotNull
	private String password;

	@NotNull
	private String email;
	
	@Column(name = "about_me")
	private String aboutMe;
	
	@Column(name = "my_inspiration")
	private String myInspiration;

	@NotNull
	@Column(name = "tutorial_done")
	private Boolean tutorialDone;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private Role role;

	
	/**
	 * defines a one to many relation with the userImage-entity
	 */

	@OneToOne(mappedBy = "userId", cascade = CascadeType.ALL)
	private UserImage userImage;
	
	/**
	 * defines a one to many relation with the task-entity
	 */

	@OneToMany(mappedBy = "parentUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Story> stories;


	/**
	 * constructors
	 */
	
	public StoriiUser(String name, String password, String email, String aboutMe, String myInspiration, Boolean tutorialDone) {
		this.name = name;
		BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();
		this.password = bcryptEncoder.encode(password);
		this.email = email;
		this.aboutMe = aboutMe;
		this.myInspiration = myInspiration;
		this.tutorialDone = tutorialDone;
	}

	public StoriiUser() {
		this.name = "default";
		BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();
		this.password = bcryptEncoder.encode("defaultPW!*!");
		System.out.println(this.password);
		this.email = "default";
		this.aboutMe = "default";
		this.myInspiration = "default";
		this.tutorialDone = false;
		this.role = Role.USER;
	}
	
	public StoriiUser(String name, String password, String email, String aboutMe, String myInspiration, boolean tutorialDone, Role role) {
		this.name = name;
		BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();
		this.password = bcryptEncoder.encode(password);
		this.email = email;
		this.aboutMe = aboutMe;
		this.myInspiration = myInspiration;
		this.tutorialDone = tutorialDone;
		this.role = role;
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Set<Story> getStories() {
		return stories;
	}

	public void setStories(Set<Story> stories) {
		this.stories = stories;
	}

	public String getAboutMe() {
		return aboutMe;
	}

	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}

	public String getMyInspiration() {
		return myInspiration;
	}

	public void setMyInspiration(String myInspiration) {
		this.myInspiration = myInspiration;
	}
	
}
