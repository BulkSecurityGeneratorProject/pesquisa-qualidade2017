package com.qualidade.pesquisa.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Professor entity.
 */
public class ProfessorDTO implements Serializable {

    private Long id;

    private String nome;

    private Long areaId;

    private Long userId;

    private Boolean invite;

    private Double nota;

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
    

    public void setInvite(Boolean invite) {
        this.invite = invite;
    }

    public Boolean getInvite() {
        return invite;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getAreaId() {
        return areaId;
    }

    public void setAreaId(Long areaPesquisaId) {
        this.areaId = areaPesquisaId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProfessorDTO professorDTO = (ProfessorDTO) o;
        if(professorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), professorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProfessorDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
