package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.AlunoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Aluno and its DTO AlunoDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, ProfessorMapper.class, })
public interface AlunoMapper extends EntityMapper <AlunoDTO, Aluno> {

    @Mapping(source = "user.id", target = "userId")

    @Mapping(source = "orientador.id", target = "orientadorId")
    AlunoDTO toDto(Aluno aluno); 

    @Mapping(source = "userId", target = "user")

    @Mapping(source = "orientadorId", target = "orientador")
    Aluno toEntity(AlunoDTO alunoDTO); 
    default Aluno fromId(Long id) {
        if (id == null) {
            return null;
        }
        Aluno aluno = new Aluno();
        aluno.setId(id);
        return aluno;
    }
}
