package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.ProfessorBancaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProfessorBanca and its DTO ProfessorBancaDTO.
 */
@Mapper(componentModel = "spring", uses = {ProfessorMapper.class, BancaMapper.class, })
public interface ProfessorBancaMapper extends EntityMapper <ProfessorBancaDTO, ProfessorBanca> {

    @Mapping(source = "professor.id", target = "professorId")

    @Mapping(source = "banca.id", target = "bancaId")
    ProfessorBancaDTO toDto(ProfessorBanca professorBanca); 

    @Mapping(source = "professorId", target = "professor")

    @Mapping(source = "bancaId", target = "banca")
    ProfessorBanca toEntity(ProfessorBancaDTO professorBancaDTO); 
    default ProfessorBanca fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProfessorBanca professorBanca = new ProfessorBanca();
        professorBanca.setId(id);
        return professorBanca;
    }
}
