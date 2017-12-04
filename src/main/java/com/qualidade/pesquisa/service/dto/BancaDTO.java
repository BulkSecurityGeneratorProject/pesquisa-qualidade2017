package com.qualidade.pesquisa.service.dto;


import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;

/**
 * A DTO for the Banca entity.
 */
public class BancaDTO implements Serializable {

    private Long id;

    private Boolean flgaprovadasecretaria;

    private Page<ProfessorDTO> professoresDTO;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Page<ProfessorDTO> getProfessoresDTO() {
        return professoresDTO;
    }

    public void setProfessoresDTO(Page<ProfessorDTO> professoresDTO) {
        this.professoresDTO = professoresDTO;
    }

    public Boolean isFlgaprovadasecretaria() {
        return flgaprovadasecretaria;
    }

    public void setFlgaprovadasecretaria(Boolean flgaprovadasecretaria) {
        this.flgaprovadasecretaria = flgaprovadasecretaria;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BancaDTO bancaDTO = (BancaDTO) o;
        if(bancaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bancaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BancaDTO{" +
            "id=" + getId() +
            ", flgaprovadasecretaria='" + isFlgaprovadasecretaria() + "'" +
            "}";
    }
}
