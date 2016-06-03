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
	@Column(name = "story_id")
	private long id;

	@NotNull
	private String name;

	@NotNull
	@Column(name  = "author_name")
	private String authorName;

	@NotNull
	@Column(name  = "co_author_name")
	private String coAuthorName;

	@NotNull
	@Column(name  = "is_published")
	private boolean isPublished;

	/**
	 * defines a one to many relation with the userImage-entity
	 */

	@OneToOne(mappedBy = "storyIdSet", cascade = CascadeType.ALL)
	private StoryImage setStoryImage;
	
	@OneToMany(mappedBy = "storyId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<StoryImage> allStoryImages;


	
	@ManyToOne
	@JsonIdentityReference(alwaysAsId=true)
	@JoinColumn(name = "parent_user")
	private StoriiUser parentUser;
	
	@JsonIdentityReference(alwaysAsId=true)
	@OneToMany(mappedBy = "parentStory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Page> pages;
	
	@OneToMany(mappedBy = "ratedStory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Rating> ratings;

	
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

	public StoryImage getSetStoryImage() {
		return setStoryImage;
	}

	public void setSetStoryImage(StoryImage setStoryImage) {
		this.setStoryImage = setStoryImage;
	}

	public Set<StoryImage> getAllStoryImages() {
		return allStoryImages;
	}

	public void setAllStoryImages(Set<StoryImage> allStoryImages) {
		this.allStoryImages = allStoryImages;
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

	public Page getFirstPage() {
		return firstPage;
	}

	public void setFirstPage(Page firstPage) {
		this.firstPage = firstPage;
	}

	public Set<Rating> getRatings() {
		return ratings;
	}

	public void setRatings(Set<Rating> ratings) {
		this.ratings = ratings;
	}
	
	
	
	/**
	 * getters and setters
	 */
	
	

}
