package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.ProfessorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Professor and its DTO ProfessorDTO.
 */
@Mapper(componentModel = "spring", uses = {ProfessorBancaMapper.class, AlunoMapper.class, AreaPesquisaMapper.class, UserMapper.class, CoOrientadorMapper.class, })
public interface ProfessorMapper extends EntityMapper <ProfessorDTO, Professor> {

    @Mapping(source = "professorBanca.id", target = "professorBancaId")

    @Mapping(source = "aluno.id", target = "alunoId")

    @Mapping(source = "area.id", target = "areaId")

    @Mapping(source = "user.id", target = "userId")

    @Mapping(source = "coOrientador.id", target = "coOrientadorId")
    ProfessorDTO toDto(Professor professor); 

    @Mapping(source = "professorBancaId", target = "professorBanca")

    @Mapping(source = "alunoId", target = "aluno")

    @Mapping(source = "areaId", target = "area")

    @Mapping(source = "userId", target = "user")

    @Mapping(source = "coOrientadorId", target = "coOrientador")
    Professor toEntity(ProfessorDTO professorDTO); 
    default Professor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Professor professor = new Professor();
        professor.setId(id);
        return professor;
    }
}
