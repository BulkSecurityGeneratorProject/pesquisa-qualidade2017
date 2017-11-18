package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.BancaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Banca and its DTO BancaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BancaMapper extends EntityMapper <BancaDTO, Banca> {
    
    
    default Banca fromId(Long id) {
        if (id == null) {
            return null;
        }
        Banca banca = new Banca();
        banca.setId(id);
        return banca;
    }
}
