package storii.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UserStory.
 */
@Entity
@Table(name = "user_story")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserStory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;
    
    @Column(name = "author_name")
    private String author_name;
    
    @Column(name = "co_author_name")
    private String co_author_name;
    
    @Column(name = "is_published")
    private Integer isPublished;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor_name() {
        return author_name;
    }
    
    public void setAuthor_name(String author_name) {
        this.author_name = author_name;
    }

    public String getCo_author_name() {
        return co_author_name;
    }
    
    public void setCo_author_name(String co_author_name) {
        this.co_author_name = co_author_name;
    }

    public Integer getIsPublished() {
        return isPublished;
    }
    
    public void setIsPublished(Integer isPublished) {
        this.isPublished = isPublished;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserStory userStory = (UserStory) o;
        if(userStory.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, userStory.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "UserStory{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", author_name='" + author_name + "'" +
            ", co_author_name='" + co_author_name + "'" +
            ", isPublished='" + isPublished + "'" +
            '}';
    }
}
