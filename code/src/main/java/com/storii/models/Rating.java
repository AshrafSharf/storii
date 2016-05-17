package com.storii.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "ratings")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Rating {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "rating_id")
	private long id;

	@Column(name = "value")
	@NotNull
	private int value;
	
	@Column(name = "comment")
	@NotNull
	private String comment;
	
	@ManyToOne
	@JsonIdentityReference(alwaysAsId=true)
	private StoriiUser ratingUser;
	
	@ManyToOne
	@JsonIdentityReference(alwaysAsId=true)
	private Story ratedStory;

	
	public Rating(){
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public StoriiUser getRatingUser() {
		return ratingUser;
	}

	public void setRatingUser(StoriiUser ratingUser) {
		this.ratingUser = ratingUser;
	}

	public Story getRatedStory() {
		return ratedStory;
	}

	public void setRatedStory(Story ratedStory) {
		this.ratedStory = ratedStory;
	}
	
}
