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
@Table(name = "pages")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Page {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "page_id")
	private long id;

	@NotNull
	private String title;

	@NotNull
	private String description;

	@NotNull
	private int level;

	@NotNull
	private int position;

	@NotNull
	private String serializedContent;
	
	/**
	 * defines a one to many relation with the userImage-entity
	 */

	@OneToOne(mappedBy = "pageId", cascade = CascadeType.ALL)
	private PageImage pageImage;
	
	@ManyToOne
	@JsonIdentityReference(alwaysAsId=true)
	@JoinColumn(name = "parent_story")
	private Story parentStory;
	
	@OneToOne(mappedBy = "firstPage", cascade = CascadeType.ALL)
	private Story firstPageInStory;


	/**
	 * constructors
	 */
	
	public Page(Story parent){
		this.title = "defaultTitle";
		this.description = "defaultDescription";
		this.level = -1;
		this.position = -1;
		this.serializedContent = "";
		this.parentStory = parent;
		this.firstPageInStory = parent;

	}
	
	public Page(int level, int position){
		this.title = "defaultTitle";
		this.description = "defaultDescription";
		this.level = level;
		this.position = position;
		this.serializedContent = "";
		this.parentStory = null;
		this.firstPageInStory = null;
	}
	
	public Page(){
		this.title = "defaultTitle";
		this.description = "defaultDescription";
		this.level = -1;
		this.position = -1;
		this.serializedContent = "";
		this.parentStory = null;
		this.firstPageInStory = null;
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public String getSerializedContent() {
		return serializedContent;
	}

	public void setSerializedContent(String serializedContent) {
		this.serializedContent = serializedContent;
	}
	
	public PageImage getPageImage() {
		return pageImage;
	}

	public void setPageImage(PageImage pageImage) {
		this.pageImage = pageImage;
	}

	public Story getParentStory() {
		return parentStory;
	}

	public void setParentStory(Story parentStory) {
		this.parentStory = parentStory;
	}
	
	
	

}
