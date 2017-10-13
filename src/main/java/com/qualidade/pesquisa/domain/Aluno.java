package com.qualidade.pesquisa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Aluno.
 */
@Entity
@Table(name = "aluno")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Aluno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private Artigo artigo;

    @ManyToOne
    private PropostaTese propostaTese;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "aluno")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Professor> orientadors = new HashSet<>();

    @ManyToOne
    private CoOrientador coOrientador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Artigo getArtigo() {
        return artigo;
    }

    public Aluno artigo(Artigo artigo) {
        this.artigo = artigo;
        return this;
    }

    public void setArtigo(Artigo artigo) {
        this.artigo = artigo;
    }

    public PropostaTese getPropostaTese() {
        return propostaTese;
    }

    public Aluno propostaTese(PropostaTese propostaTese) {
        this.propostaTese = propostaTese;
        return this;
    }

    public void setPropostaTese(PropostaTese propostaTese) {
        this.propostaTese = propostaTese;
    }

    public User getUser() {
        return user;
    }

    public Aluno user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Professor> getOrientadors() {
        return orientadors;
    }

    public Aluno orientadors(Set<Professor> professors) {
        this.orientadors = professors;
        return this;
    }

    public Aluno addOrientador(Professor professor) {
        this.orientadors.add(professor);
        professor.setAluno(this);
        return this;
    }

    public Aluno removeOrientador(Professor professor) {
        this.orientadors.remove(professor);
        professor.setAluno(null);
        return this;
    }

    public void setOrientadors(Set<Professor> professors) {
        this.orientadors = professors;
    }

    public CoOrientador getCoOrientador() {
        return coOrientador;
    }

    public Aluno coOrientador(CoOrientador coOrientador) {
        this.coOrientador = coOrientador;
        return this;
    }

    public void setCoOrientador(CoOrientador coOrientador) {
        this.coOrientador = coOrientador;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Aluno aluno = (Aluno) o;
        if (aluno.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aluno.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Aluno{" +
            "id=" + getId() +
            "}";
    }
}
