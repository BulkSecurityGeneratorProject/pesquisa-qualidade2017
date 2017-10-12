package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.PropostaTeseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PropostaTese and its DTO PropostaTeseDTO.
 */
@Mapper(componentModel = "spring", uses = {ApresentacaoMapper.class, })
public interface PropostaTeseMapper extends EntityMapper <PropostaTeseDTO, PropostaTese> {

    @Mapping(source = "apresentacao.id", target = "apresentacaoId")
    PropostaTeseDTO toDto(PropostaTese propostaTese); 

    @Mapping(source = "apresentacaoId", target = "apresentacao")
    @Mapping(target = "alunos", ignore = true)
    PropostaTese toEntity(PropostaTeseDTO propostaTeseDTO); 
    default PropostaTese fromId(Long id) {
        if (id == null) {
            return null;
        }
        PropostaTese propostaTese = new PropostaTese();
        propostaTese.setId(id);
        return propostaTese;
    }
}
