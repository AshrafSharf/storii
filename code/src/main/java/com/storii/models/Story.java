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
import javax.persistence.ManyToOne;
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
@Table(name = "stories")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Story {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Autowired
	@Column(name = "story_id")
	private long id;

	@NotNull
	@Autowired
	private String name;

	@NotNull
	@Autowired
	@Column(name  = "author_name")
	private String authorName;

	@NotNull
	@Autowired
	@Column(name  = "co_author_name")
	private String coAuthorName;

	@NotNull
	@Autowired
	@Column(name  = "is_published")
	private boolean isPublished;

	/**
	 * defines a one to many relation with the userImage-entity
	 */

	@OneToOne(mappedBy = "storyId", cascade = CascadeType.ALL)
	private StoryImage storyImage;

	
	@Autowired
	@ManyToOne
	@JsonIdentityReference(alwaysAsId=true)
	@JoinColumn(name = "parent_user")
	private StoriiUser parentUser;
	
	@Autowired
	@JsonIdentityReference(alwaysAsId=true)
	@OneToMany(mappedBy = "parentStory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Page> pages;
	
	@OneToOne
	@JoinColumn(name = "first_page_id")
	private Page firstPage;

	/**
	 * constructors
	 */
	
	public Story(String name, String authorName, String coAuthorName, boolean isPublished) {
		this.name = name;
		this.authorName = authorName;
		this.coAuthorName = coAuthorName;
		this.isPublished = isPublished;
	}

	public Story() {
		this.name = "defaultName";
		this.authorName = "defaultAuthor";
		this.coAuthorName = "defaultCoAuthor";
		this.isPublished = false;
	}

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

	public String getAuthorName() {
		return authorName;
	}

	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}

	public String getCoAuthorName() {
		return coAuthorName;
	}

	public void setCoAuthorName(String coAuthorName) {
		this.coAuthorName = coAuthorName;
	}

	public boolean isPublished() {
		return isPublished;
	}

	public void setPublished(boolean isPublished) {
		this.isPublished = isPublished;
	}


	public StoryImage getStoryImage() {
		return storyImage;
	}

	public void setStoryImage(StoryImage storyImage) {
		this.storyImage = storyImage;
	}

	public StoriiUser getParentUser() {
		return parentUser;
	}

	public void setParentUser(StoriiUser parentUser) {
		this.parentUser = parentUser;
	}

	public Set<Page> getPages() {
		return pages;
	}

	public void setPages(Set<Page> pages) {
		this.pages = pages;
	}
	
	/**
	 * getters and setters
	 */
	
	

}
