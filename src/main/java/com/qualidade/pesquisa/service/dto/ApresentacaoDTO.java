package com.qualidade.pesquisa.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Apresentacao entity.
 */
public class ApresentacaoDTO implements Serializable {

    private Long id;

    private LocalDate data;

    private Boolean flgagendamentoaprovado;

    private Long bancaId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Boolean isFlgagendamentoaprovado() {
        return flgagendamentoaprovado;
    }

    public void setFlgagendamentoaprovado(Boolean flgagendamentoaprovado) {
        this.flgagendamentoaprovado = flgagendamentoaprovado;
    }

    public Long getBancaId() {
        return bancaId;
    }

    public void setBancaId(Long bancaId) {
        this.bancaId = bancaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ApresentacaoDTO apresentacaoDTO = (ApresentacaoDTO) o;
        if(apresentacaoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), apresentacaoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ApresentacaoDTO{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", flgagendamentoaprovado='" + isFlgagendamentoaprovado() + "'" +
            "}";
    }
}
