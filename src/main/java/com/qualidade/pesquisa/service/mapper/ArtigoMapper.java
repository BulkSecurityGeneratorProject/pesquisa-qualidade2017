package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.ArtigoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Artigo and its DTO ArtigoDTO.
 */
@Mapper(componentModel = "spring", uses = {AlunoMapper.class, })
public interface ArtigoMapper extends EntityMapper <ArtigoDTO, Artigo> {

    @Mapping(source = "aluno.id", target = "alunoId")
    ArtigoDTO toDto(Artigo artigo); 

    @Mapping(source = "alunoId", target = "aluno")
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
