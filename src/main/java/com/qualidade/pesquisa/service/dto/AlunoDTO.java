package com.qualidade.pesquisa.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Aluno entity.
 */
public class AlunoDTO implements Serializable {

    private Long id;

    private Long artigoId;

    private Long propostaTeseId;

    private Long userId;

    private Long coOrientadorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getArtigoId() {
        return artigoId;
    }

    public void setArtigoId(Long artigoId) {
        this.artigoId = artigoId;
    }

    public Long getPropostaTeseId() {
        return propostaTeseId;
    }

    public void setPropostaTeseId(Long propostaTeseId) {
        this.propostaTeseId = propostaTeseId;
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

        AlunoDTO alunoDTO = (AlunoDTO) o;
        if(alunoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alunoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AlunoDTO{" +
            "id=" + getId() +
            "}";
    }
}
