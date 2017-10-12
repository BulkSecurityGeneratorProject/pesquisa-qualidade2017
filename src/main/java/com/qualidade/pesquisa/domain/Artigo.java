package com.qualidade.pesquisa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Artigo.
 */
@Entity
@Table(name = "artigo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Artigo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "datapublicacao")
    private LocalDate datapublicacao;

    @Column(name = "jhi_link")
    private String link;

    @NotNull
    @Column(name = "flgrelacionadopesquisa", nullable = false)
    private Boolean flgrelacionadopesquisa;

    @OneToMany(mappedBy = "artigo")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Aluno> alunos = new HashSet<>();

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

    public Artigo nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTitulo() {
        return titulo;
    }

    public Artigo titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public LocalDate getDatapublicacao() {
        return datapublicacao;
    }

    public Artigo datapublicacao(LocalDate datapublicacao) {
        this.datapublicacao = datapublicacao;
        return this;
    }

    public void setDatapublicacao(LocalDate datapublicacao) {
        this.datapublicacao = datapublicacao;
    }

    public String getLink() {
        return link;
    }

    public Artigo link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Boolean isFlgrelacionadopesquisa() {
        return flgrelacionadopesquisa;
    }

    public Artigo flgrelacionadopesquisa(Boolean flgrelacionadopesquisa) {
        this.flgrelacionadopesquisa = flgrelacionadopesquisa;
        return this;
    }

    public void setFlgrelacionadopesquisa(Boolean flgrelacionadopesquisa) {
        this.flgrelacionadopesquisa = flgrelacionadopesquisa;
    }

    public Set<Aluno> getAlunos() {
        return alunos;
    }

    public Artigo alunos(Set<Aluno> alunos) {
        this.alunos = alunos;
        return this;
    }

    public Artigo addAluno(Aluno aluno) {
        this.alunos.add(aluno);
        aluno.setArtigo(this);
        return this;
    }

    public Artigo removeAluno(Aluno aluno) {
        this.alunos.remove(aluno);
        aluno.setArtigo(null);
        return this;
    }

    public void setAlunos(Set<Aluno> alunos) {
        this.alunos = alunos;
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
        Artigo artigo = (Artigo) o;
        if (artigo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), artigo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Artigo{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", datapublicacao='" + getDatapublicacao() + "'" +
            ", link='" + getLink() + "'" +
            ", flgrelacionadopesquisa='" + isFlgrelacionadopesquisa() + "'" +
            "}";
    }
}
