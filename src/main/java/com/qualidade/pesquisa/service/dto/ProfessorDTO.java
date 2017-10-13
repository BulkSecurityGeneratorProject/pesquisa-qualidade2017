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

    private Long professorBancaId;

    private Long alunoId;

    private Long areaId;

    private Long userId;

    private Long coOrientadorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProfessorBancaId() {
        return professorBancaId;
    }

    public void setProfessorBancaId(Long professorBancaId) {
        this.professorBancaId = professorBancaId;
    }

    public Long getAlunoId() {
        return alunoId;
    }

    public void setAlunoId(Long alunoId) {
        this.alunoId = alunoId;
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

    public Long getCoOrientadorId() {
        return coOrientadorId;
    }

    public void setCoOrientadorId(Long coOrientadorId) {
        this.coOrientadorId = coOrientadorId;
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
            "}";
    }
}
