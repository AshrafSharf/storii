package com.storii.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "page_images")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class PageImage {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Autowired
	@Column(name = "page_image_id")
	private long id;

	@NotNull
	@Autowired
	private String name;
	
	@NotNull
	@Autowired
	private String path;
	
	@OneToOne
	@JoinColumn(name = "setPageImage")
	private Page pageIdSet;
		
	@ManyToOne
	@JoinColumn(name = "pageId")
	private Page pageId;


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

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Page getPageIdSet() {
		return pageIdSet;
	}

	public void setPageIdSet(Page pageIdSet) {
		this.pageIdSet = pageIdSet;
	}

	public Page getPageId() {
		return pageId;
	}

	public void setPageId(Page pageId) {
		this.pageId = pageId;
	}
	
}
