package com.qualidade.pesquisa.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Artigo entity.
 */
public class ArtigoDTO implements Serializable {

    private Long id;

    @NotNull
    private String nome;

    @NotNull
    private String titulo;

    private LocalDate datapublicacao;

    private String link;

    @NotNull
    private Boolean flgrelacionadopesquisa;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public LocalDate getDatapublicacao() {
        return datapublicacao;
    }

    public void setDatapublicacao(LocalDate datapublicacao) {
        this.datapublicacao = datapublicacao;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Boolean isFlgrelacionadopesquisa() {
        return flgrelacionadopesquisa;
    }

    public void setFlgrelacionadopesquisa(Boolean flgrelacionadopesquisa) {
        this.flgrelacionadopesquisa = flgrelacionadopesquisa;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ArtigoDTO artigoDTO = (ArtigoDTO) o;
        if(artigoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), artigoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArtigoDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", datapublicacao='" + getDatapublicacao() + "'" +
            ", link='" + getLink() + "'" +
            ", flgrelacionadopesquisa='" + isFlgrelacionadopesquisa() + "'" +
            "}";
    }
}
