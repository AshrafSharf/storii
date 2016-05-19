package com.storii.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "intern_links")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class InternLink {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "intern_link_id")
	private long id;
	
	@NotNull
	private String name;
	
	@JsonIdentityReference(alwaysAsId=true)
	@ManyToOne
	private Page nextPage;
	
	@JsonIdentityReference(alwaysAsId=true)
	@ManyToOne
	private Page owningPage;
	
	public InternLink(){
		
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

	public Page getNextPage() {
		return nextPage;
	}

	public void setNextPage(Page nextPage) {
		this.nextPage = nextPage;
	}

	public Page getOwningPage() {
		return owningPage;
	}

	public void setOwningPage(Page owningPage) {
		this.owningPage = owningPage;
	}

	
	
}
