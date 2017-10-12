package com.qualidade.pesquisa.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Tese.
 */
@Entity
@Table(name = "tese")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tese implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nota")
    private Double nota;

    @Column(name = "jhi_link")
    private String link;

    @OneToOne
    @JoinColumn(unique = true)
    private Aluno aluno;

    @OneToOne
    @JoinColumn(unique = true)
    private Apresentacao apresentacao;

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

    public Tese nota(Double nota) {
        this.nota = nota;
        return this;
    }

    public void setNota(Double nota) {
        this.nota = nota;
    }

    public String getLink() {
        return link;
    }

    public Tese link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public Tese aluno(Aluno aluno) {
        this.aluno = aluno;
        return this;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Apresentacao getApresentacao() {
        return apresentacao;
    }

    public Tese apresentacao(Apresentacao apresentacao) {
        this.apresentacao = apresentacao;
        return this;
    }

    public void setApresentacao(Apresentacao apresentacao) {
        this.apresentacao = apresentacao;
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
        Tese tese = (Tese) o;
        if (tese.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tese.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tese{" +
            "id=" + getId() +
            ", nota='" + getNota() + "'" +
            ", link='" + getLink() + "'" +
            "}";
    }
}
