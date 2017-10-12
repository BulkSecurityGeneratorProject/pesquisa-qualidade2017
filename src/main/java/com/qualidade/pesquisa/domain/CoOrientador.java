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
 * A CoOrientador.
 */
@Entity
@Table(name = "co_orientador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CoOrientador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "coOrientador")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Aluno> alunos = new HashSet<>();

    @OneToMany(mappedBy = "coOrientador")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Professor> professors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Aluno> getAlunos() {
        return alunos;
    }

    public CoOrientador alunos(Set<Aluno> alunos) {
        this.alunos = alunos;
        return this;
    }

    public CoOrientador addAluno(Aluno aluno) {
        this.alunos.add(aluno);
        aluno.setCoOrientador(this);
        return this;
    }

    public CoOrientador removeAluno(Aluno aluno) {
        this.alunos.remove(aluno);
        aluno.setCoOrientador(null);
        return this;
    }

    public void setAlunos(Set<Aluno> alunos) {
        this.alunos = alunos;
    }

    public Set<Professor> getProfessors() {
        return professors;
    }

    public CoOrientador professors(Set<Professor> professors) {
        this.professors = professors;
        return this;
    }

    public CoOrientador addProfessor(Professor professor) {
        this.professors.add(professor);
        professor.setCoOrientador(this);
        return this;
    }

    public CoOrientador removeProfessor(Professor professor) {
        this.professors.remove(professor);
        professor.setCoOrientador(null);
        return this;
    }

    public void setProfessors(Set<Professor> professors) {
        this.professors = professors;
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
        CoOrientador coOrientador = (CoOrientador) o;
        if (coOrientador.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), coOrientador.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CoOrientador{" +
            "id=" + getId() +
            "}";
    }
}
