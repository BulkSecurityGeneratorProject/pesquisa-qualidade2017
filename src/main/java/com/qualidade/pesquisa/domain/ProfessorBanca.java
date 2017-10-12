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
 * A ProfessorBanca.
 */
@Entity
@Table(name = "professor_banca")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProfessorBanca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nota")
    private Double nota;

    @OneToMany(mappedBy = "professorBanca")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Professor> professors = new HashSet<>();

    @OneToMany(mappedBy = "professorBanca")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Banca> bancas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getNota() {
        return nota;
    }

    public ProfessorBanca nota(Double nota) {
        this.nota = nota;
        return this;
    }

    public void setNota(Double nota) {
        this.nota = nota;
    }

    public Set<Professor> getProfessors() {
        return professors;
    }

    public ProfessorBanca professors(Set<Professor> professors) {
        this.professors = professors;
        return this;
    }

    public ProfessorBanca addProfessor(Professor professor) {
        this.professors.add(professor);
        professor.setProfessorBanca(this);
        return this;
    }

    public ProfessorBanca removeProfessor(Professor professor) {
        this.professors.remove(professor);
        professor.setProfessorBanca(null);
        return this;
    }

    public void setProfessors(Set<Professor> professors) {
        this.professors = professors;
    }

    public Set<Banca> getBancas() {
        return bancas;
    }

    public ProfessorBanca bancas(Set<Banca> bancas) {
        this.bancas = bancas;
        return this;
    }

    public ProfessorBanca addBanca(Banca banca) {
        this.bancas.add(banca);
        banca.setProfessorBanca(this);
        return this;
    }

    public ProfessorBanca removeBanca(Banca banca) {
        this.bancas.remove(banca);
        banca.setProfessorBanca(null);
        return this;
    }

    public void setBancas(Set<Banca> bancas) {
        this.bancas = bancas;
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
        ProfessorBanca professorBanca = (ProfessorBanca) o;
        if (professorBanca.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), professorBanca.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProfessorBanca{" +
            "id=" + getId() +
            ", nota='" + getNota() + "'" +
            "}";
    }
}
