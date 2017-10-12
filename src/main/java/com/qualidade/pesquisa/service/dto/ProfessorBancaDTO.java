package com.qualidade.pesquisa.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ProfessorBanca entity.
 */
public class ProfessorBancaDTO implements Serializable {

    private Long id;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProfessorBancaDTO professorBancaDTO = (ProfessorBancaDTO) o;
        if(professorBancaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), professorBancaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProfessorBancaDTO{" +
            "id=" + getId() +
            ", nota='" + getNota() + "'" +
            "}";
    }
}
