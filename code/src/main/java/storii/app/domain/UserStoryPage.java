package storii.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UserStoryPage.
 */
@Entity
@Table(name = "user_story_page")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserStoryPage implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;
    
    @Column(name = "level")
    private Integer level;
    
    @Column(name = "position")
    private Integer position;
    
    @Column(name = "title")
    private String title;
    
    @Column(name = "serialized_content")
    private String serialized_content;
    
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

    public Integer getLevel() {
        return level;
    }
    
    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getPosition() {
        return position;
    }
    
    public void setPosition(Integer position) {
        this.position = position;
    }

    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }

    public String getSerialized_content() {
        return serialized_content;
    }
    
    public void setSerialized_content(String serialized_content) {
        this.serialized_content = serialized_content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserStoryPage userStoryPage = (UserStoryPage) o;
        if(userStoryPage.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, userStoryPage.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "UserStoryPage{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", level='" + level + "'" +
            ", position='" + position + "'" +
            ", title='" + title + "'" +
            ", serialized_content='" + serialized_content + "'" +
            '}';
    }
}
