package com.qualidade.pesquisa.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Tese entity.
 */
public class TeseDTO implements Serializable {

    private Long id;

    private Double nota;

    private String link;

    private Long alunoId;

    private Long apresentacaoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getNota() {
        return nota;
    }

    public void setNota(Double nota) {
        this.nota = nota;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Long getAlunoId() {
        return alunoId;
    }

    public void setAlunoId(Long alunoId) {
        this.alunoId = alunoId;
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

        TeseDTO teseDTO = (TeseDTO) o;
        if(teseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TeseDTO{" +
            "id=" + getId() +
            ", nota='" + getNota() + "'" +
            ", link='" + getLink() + "'" +
            "}";
    }
}
