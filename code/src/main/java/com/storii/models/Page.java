package com.storii.models;

import java.util.HashSet;
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

	@OneToMany(mappedBy = "owningPage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<InternLink> outgoingInternLinks;

	@JsonIdentityReference(alwaysAsId = true)
	@OneToMany(mappedBy = "nextPage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<InternLink> incomingInternLinks;

	/**
	 * defines a one to many relation with the userImage-entity
	 */

	@OneToOne(mappedBy = "pageIdSet", cascade = CascadeType.ALL)
	private PageImage setPageImage;
	
	@OneToMany(mappedBy = "pageId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<PageImage> allPageImages;

	@ManyToOne
	@JsonIdentityReference(alwaysAsId = true)
	@JoinColumn(name = "parent_story")
	private Story parentStory;

	@JsonIdentityReference(alwaysAsId = true)
	@OneToOne(mappedBy = "firstPage", cascade = CascadeType.ALL)
	private Story firstPageInStory;

	/**
	 * constructors
	 */

	public Page(Story parent) {
		this.title = "defaultTitle";
		this.description = "defaultDescription";
		this.level = 0;
		this.position = 1;
		this.serializedContent = "";
		this.parentStory = parent;
		this.firstPageInStory = parent;

	}

	public Page(int level, int position) {
		this.title = "defaultTitle";
		this.description = "defaultDescription";
		this.level = level;
		this.position = position;
		this.serializedContent = "";
		this.parentStory = null;
		this.firstPageInStory = null;
	}

	public Page() {
		this.title = "defaultTitle";
		this.description = "defaultDescription";
		this.level = -1;
		this.position = -1;
		this.serializedContent = "";
		this.parentStory = null;
		this.firstPageInStory = null;
		this.incomingInternLinks = new HashSet<InternLink>();
		this.outgoingInternLinks = new HashSet<InternLink>();
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

	public PageImage getSetPageImage() {
		return setPageImage;
	}

	public void setSetPageImage(PageImage setPageImage) {
		this.setPageImage = setPageImage;
	}

	public Set<PageImage> getAllPageImages() {
		return allPageImages;
	}

	public void setAllPageImages(Set<PageImage> allPageImages) {
		this.allPageImages = allPageImages;
	}

	public Story getParentStory() {
		return parentStory;
	}

	public void setParentStory(Story parentStory) {
		this.parentStory = parentStory;
	}

	public Set<InternLink> getOutgoingInternLinks() {
		return outgoingInternLinks;
	}

	public void setOutgoingInternLinks(Set<InternLink> outgoingInternLinks) {
		this.outgoingInternLinks = outgoingInternLinks;
	}

	public Set<InternLink> getIncomingInternLinks() {
		return incomingInternLinks;
	}

	public void setIncomingInternLinks(Set<InternLink> incomingInternLinks) {
		this.incomingInternLinks = incomingInternLinks;
	}

	public Story getFirstPageInStory() {
		return firstPageInStory;
	}

	public void setFirstPageInStory(Story firstPageInStory) {
		this.firstPageInStory = firstPageInStory;
	}

	public Page cloneForSwap() {
		Page cloned = new Page();

		cloned.setLevel(this.level);
		cloned.setPosition(this.position);

		for (InternLink link : this.incomingInternLinks) {
			cloned.getIncomingInternLinks().add(link);
			// System.out.println(cloned.getIncomingInternLinks());
		}

		for (InternLink link : this.outgoingInternLinks) {
			cloned.getOutgoingInternLinks().add(link);
		}

		return cloned;
	}

	public boolean isFull() {
		int numberOfLinks = 0;
		for (InternLink link : this.getOutgoingInternLinks()) {
			numberOfLinks++;
		}
		if (numberOfLinks > 3) {
			return true;
		} else {
			return false;
		}
	}
	
	public int numberOfLinks() {
		int numberOfLinks = 0;
		for (InternLink link : this.getOutgoingInternLinks()) {
			numberOfLinks++;
		}
		return numberOfLinks;
	}

	public void adjustBranchLevel(int indicator) {
		this.setLevel(this.getLevel() + indicator);
		//System.out.println(this.getId());
		for (InternLink link : this.getOutgoingInternLinks()) {
			link.getNextPage().adjustBranchLevel(indicator);
		}
	}

	public void addChildPages(Set<Page> pages) {
		pages.add(this);
		if (this.getOutgoingInternLinks() != null) {
			for (InternLink link : this.getOutgoingInternLinks()) {
				link.getNextPage().addChildPages(pages);
			}
		}
	}
	
	public boolean countAfterDelete(){
		
		Page firstIncomingPage = null;
		
		for(InternLink link : this.getIncomingInternLinks()){
			firstIncomingPage = link.getOwningPage();
			break;
		}
		
		return this.getOutgoingInternLinks().size() + firstIncomingPage.getOutgoingInternLinks().size() <= 5;

	}

}
