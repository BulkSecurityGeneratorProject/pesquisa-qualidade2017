package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.TeseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Tese and its DTO TeseDTO.
 */
@Mapper(componentModel = "spring", uses = {AlunoMapper.class, ApresentacaoMapper.class, })
public interface TeseMapper extends EntityMapper <TeseDTO, Tese> {

    @Mapping(source = "aluno.id", target = "alunoId")

    @Mapping(source = "apresentacao.id", target = "apresentacaoId")
    TeseDTO toDto(Tese tese); 

    @Mapping(source = "alunoId", target = "aluno")

    @Mapping(source = "apresentacaoId", target = "apresentacao")
    Tese toEntity(TeseDTO teseDTO); 
    default Tese fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tese tese = new Tese();
        tese.setId(id);
        return tese;
    }
}
