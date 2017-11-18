package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.CoOrientadorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CoOrientador and its DTO CoOrientadorDTO.
 */
@Mapper(componentModel = "spring", uses = {AlunoMapper.class, ProfessorMapper.class, })
public interface CoOrientadorMapper extends EntityMapper <CoOrientadorDTO, CoOrientador> {

    @Mapping(source = "aluno.id", target = "alunoId")

    @Mapping(source = "professor.id", target = "professorId")
    CoOrientadorDTO toDto(CoOrientador coOrientador); 

    @Mapping(source = "alunoId", target = "aluno")

    @Mapping(source = "professorId", target = "professor")
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
