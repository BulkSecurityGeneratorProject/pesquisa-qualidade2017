package com.qualidade.pesquisa.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the PropostaTese entity.
 */
public class PropostaTeseDTO implements Serializable {

    private Long id;

    @NotNull
    private String tema;

    private String descricao;

    private String flgaprovado;

    private String link;

    private Long apresentacaoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTema() {
        return tema;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getFlgaprovado() {
        return flgaprovado;
    }

    public void setFlgaprovado(String flgaprovado) {
        this.flgaprovado = flgaprovado;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Long getApresentacaoId() {
        return apresentacaoId;
    }

    public void setApresentacaoId(Long apresentacaoId) {
        this.apresentacaoId = apresentacaoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PropostaTeseDTO propostaTeseDTO = (PropostaTeseDTO) o;
        if(propostaTeseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), propostaTeseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PropostaTeseDTO{" +
            "id=" + getId() +
            ", tema='" + getTema() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", flgaprovado='" + getFlgaprovado() + "'" +
            ", link='" + getLink() + "'" +
            "}";
    }
}
