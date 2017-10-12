package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.ProfessorBancaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProfessorBanca and its DTO ProfessorBancaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProfessorBancaMapper extends EntityMapper <ProfessorBancaDTO, ProfessorBanca> {
    
    @Mapping(target = "professors", ignore = true)
    @Mapping(target = "bancas", ignore = true)
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
