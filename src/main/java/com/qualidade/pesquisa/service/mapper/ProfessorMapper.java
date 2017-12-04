package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.ProfessorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Professor and its DTO ProfessorDTO.
 */
@Mapper(componentModel = "spring", uses = {AreaPesquisaMapper.class, UserMapper.class, })
public interface ProfessorMapper extends EntityMapper <ProfessorDTO, Professor> {

    @Mapping(source = "area.id", target = "areaId")

    @Mapping(source = "user.id", target = "userId")
    ProfessorDTO toDto(Professor professor); 

    @Mapping(source = "areaId", target = "area")

    @Mapping(source = "userId", target = "user")
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
