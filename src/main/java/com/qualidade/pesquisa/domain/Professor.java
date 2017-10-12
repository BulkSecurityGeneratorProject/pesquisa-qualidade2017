package com.qualidade.pesquisa.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Professor.
 */
@Entity
@Table(name = "professor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Professor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @ManyToOne
    private ProfessorBanca professorBanca;

    @ManyToOne
    private Aluno aluno;

    @OneToOne
    @JoinColumn(unique = true)
    private AreaPesquisa area;

    @ManyToOne
    private CoOrientador coOrientador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Professor nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public ProfessorBanca getProfessorBanca() {
        return professorBanca;
    }

    public Professor professorBanca(ProfessorBanca professorBanca) {
        this.professorBanca = professorBanca;
        return this;
    }

    public void setProfessorBanca(ProfessorBanca professorBanca) {
        this.professorBanca = professorBanca;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public Professor aluno(Aluno aluno) {
        this.aluno = aluno;
        return this;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public AreaPesquisa getArea() {
        return area;
    }

    public Professor area(AreaPesquisa areaPesquisa) {
        this.area = areaPesquisa;
        return this;
    }

    public void setArea(AreaPesquisa areaPesquisa) {
        this.area = areaPesquisa;
    }

    public CoOrientador getCoOrientador() {
        return coOrientador;
    }

    public Professor coOrientador(CoOrientador coOrientador) {
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
        Professor professor = (Professor) o;
        if (professor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), professor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Professor{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
