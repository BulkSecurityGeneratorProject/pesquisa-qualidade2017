package com.qualidade.pesquisa.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A PropostaTese.
 */
@Entity
@Table(name = "proposta_tese")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PropostaTese implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "tema", nullable = false)
    private String tema;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "flgaprovado")
    private Boolean flgaprovado;

    @Column(name = "jhi_link")
    private String link;

    @OneToOne
    @JoinColumn(unique = true)
    private Apresentacao apresentacao;

    @ManyToOne
    private Aluno aluno;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTema() {
        return tema;
    }

    public PropostaTese tema(String tema) {
        this.tema = tema;
        return this;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }

    public String getDescricao() {
        return descricao;
    }

    public PropostaTese descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean isFlgaprovado() {
        return flgaprovado;
    }

    public PropostaTese flgaprovado(Boolean flgaprovado) {
        this.flgaprovado = flgaprovado;
        return this;
    }

    public void setFlgaprovado(Boolean flgaprovado) {
        this.flgaprovado = flgaprovado;
    }

    public String getLink() {
        return link;
    }

    public PropostaTese link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Apresentacao getApresentacao() {
        return apresentacao;
    }

    public PropostaTese apresentacao(Apresentacao apresentacao) {
        this.apresentacao = apresentacao;
        return this;
    }

    public void setApresentacao(Apresentacao apresentacao) {
        this.apresentacao = apresentacao;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public PropostaTese aluno(Aluno aluno) {
        this.aluno = aluno;
        return this;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
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
        PropostaTese propostaTese = (PropostaTese) o;
        if (propostaTese.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), propostaTese.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PropostaTese{" +
            "id=" + getId() +
            ", tema='" + getTema() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", flgaprovado='" + isFlgaprovado() + "'" +
            ", link='" + getLink() + "'" +
            "}";
    }
}
