package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.CoOrientadorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CoOrientador and its DTO CoOrientadorDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CoOrientadorMapper extends EntityMapper <CoOrientadorDTO, CoOrientador> {
    
    @Mapping(target = "alunos", ignore = true)
    @Mapping(target = "professors", ignore = true)
    CoOrientador toEntity(CoOrientadorDTO coOrientadorDTO); 
    default CoOrientador fromId(Long id) {
        if (id == null) {
            return null;
        }
        CoOrientador coOrientador = new CoOrientador();
        coOrientador.setId(id);
        return coOrientador;
    }
}
