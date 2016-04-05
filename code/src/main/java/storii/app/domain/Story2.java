package storii.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Story2.
 */
@Entity
@Table(name = "story2")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Story2 implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "meh")
    private String meh;
    
    @Column(name = "af")
    private String af;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMeh() {
        return meh;
    }
    
    public void setMeh(String meh) {
        this.meh = meh;
    }

    public String getAf() {
        return af;
    }
    
    public void setAf(String af) {
        this.af = af;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Story2 story2 = (Story2) o;
        if(story2.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, story2.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Story2{" +
            "id=" + id +
            ", meh='" + meh + "'" +
            ", af='" + af + "'" +
            '}';
    }
}
