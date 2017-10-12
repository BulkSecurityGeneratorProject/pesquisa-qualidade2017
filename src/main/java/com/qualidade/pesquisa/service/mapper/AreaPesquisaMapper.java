package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.AreaPesquisaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AreaPesquisa and its DTO AreaPesquisaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AreaPesquisaMapper extends EntityMapper <AreaPesquisaDTO, AreaPesquisa> {
    
    
    default AreaPesquisa fromId(Long id) {
        if (id == null) {
            return null;
        }
        AreaPesquisa areaPesquisa = new AreaPesquisa();
        areaPesquisa.setId(id);
        return areaPesquisa;
    }
}
