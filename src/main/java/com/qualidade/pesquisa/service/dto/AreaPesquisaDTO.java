package com.qualidade.pesquisa.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the AreaPesquisa entity.
 */
public class AreaPesquisaDTO implements Serializable {

    private Long id;

    private String nome;

    private String descricao;

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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AreaPesquisaDTO areaPesquisaDTO = (AreaPesquisaDTO) o;
        if(areaPesquisaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), areaPesquisaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AreaPesquisaDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
