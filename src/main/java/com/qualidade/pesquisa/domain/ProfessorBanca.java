package com.qualidade.pesquisa.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
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

    @ManyToOne
    private Professor professor;

    @ManyToOne
    private Banca banca;

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

    public Professor getProfessor() {
        return professor;
    }

    public ProfessorBanca professor(Professor professor) {
        this.professor = professor;
        return this;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    public Banca getBanca() {
        return banca;
    }

    public ProfessorBanca banca(Banca banca) {
        this.banca = banca;
        return this;
    }

    public void setBanca(Banca banca) {
        this.banca = banca;
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
