package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.BancaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Banca and its DTO BancaDTO.
 */
@Mapper(componentModel = "spring", uses = {ProfessorBancaMapper.class, })
public interface BancaMapper extends EntityMapper <BancaDTO, Banca> {

    @Mapping(source = "professorBanca.id", target = "professorBancaId")
    BancaDTO toDto(Banca banca); 

    @Mapping(source = "professorBancaId", target = "professorBanca")
    Banca toEntity(BancaDTO bancaDTO); 
    default Banca fromId(Long id) {
        if (id == null) {
            return null;
        }
        Banca banca = new Banca();
        banca.setId(id);
        return banca;
    }
}
