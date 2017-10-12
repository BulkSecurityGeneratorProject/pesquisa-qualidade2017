package com.qualidade.pesquisa.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Banca.
 */
@Entity
@Table(name = "banca")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Banca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "flgaprovadasecretaria")
    private Boolean flgaprovadasecretaria;

    @ManyToOne
    private ProfessorBanca professorBanca;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isFlgaprovadasecretaria() {
        return flgaprovadasecretaria;
    }

    public Banca flgaprovadasecretaria(Boolean flgaprovadasecretaria) {
        this.flgaprovadasecretaria = flgaprovadasecretaria;
        return this;
    }

    public void setFlgaprovadasecretaria(Boolean flgaprovadasecretaria) {
        this.flgaprovadasecretaria = flgaprovadasecretaria;
    }

    public ProfessorBanca getProfessorBanca() {
        return professorBanca;
    }

    public Banca professorBanca(ProfessorBanca professorBanca) {
        this.professorBanca = professorBanca;
        return this;
    }

    public void setProfessorBanca(ProfessorBanca professorBanca) {
        this.professorBanca = professorBanca;
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
        Banca banca = (Banca) o;
        if (banca.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), banca.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Banca{" +
            "id=" + getId() +
            ", flgaprovadasecretaria='" + isFlgaprovadasecretaria() + "'" +
            "}";
    }
}
