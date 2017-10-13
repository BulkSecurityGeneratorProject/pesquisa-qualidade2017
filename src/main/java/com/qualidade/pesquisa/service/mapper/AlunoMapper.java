package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.AlunoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Aluno and its DTO AlunoDTO.
 */
@Mapper(componentModel = "spring", uses = {ArtigoMapper.class, PropostaTeseMapper.class, UserMapper.class, CoOrientadorMapper.class, })
public interface AlunoMapper extends EntityMapper <AlunoDTO, Aluno> {

    @Mapping(source = "artigo.id", target = "artigoId")

    @Mapping(source = "propostaTese.id", target = "propostaTeseId")

    @Mapping(source = "user.id", target = "userId")

    @Mapping(source = "coOrientador.id", target = "coOrientadorId")
    AlunoDTO toDto(Aluno aluno); 

    @Mapping(source = "artigoId", target = "artigo")

    @Mapping(source = "propostaTeseId", target = "propostaTese")

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "orientadors", ignore = true)

    @Mapping(source = "coOrientadorId", target = "coOrientador")
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
