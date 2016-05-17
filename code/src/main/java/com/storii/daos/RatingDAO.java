package com.storii.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.storii.models.Page;
import com.storii.models.Rating;
import com.storii.models.StoriiUser;
import com.storii.models.Story;

/**
 * Spring Data CrudRepository for the cracUser entity.
 */

@Transactional
public interface RatingDAO extends CrudRepository<Rating, Long>{
	 public Rating findByRatingUserAndRatedStory(StoriiUser ratingUser, Story ratedStory);	
}
