package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.ArtigoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Artigo and its DTO ArtigoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ArtigoMapper extends EntityMapper <ArtigoDTO, Artigo> {
    
    @Mapping(target = "alunos", ignore = true)
    Artigo toEntity(ArtigoDTO artigoDTO); 
    default Artigo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Artigo artigo = new Artigo();
        artigo.setId(id);
        return artigo;
    }
}
