package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.FuncionarioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Funcionario and its DTO FuncionarioDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface FuncionarioMapper extends EntityMapper <FuncionarioDTO, Funcionario> {

    @Mapping(source = "user.id", target = "userId")
    FuncionarioDTO toDto(Funcionario funcionario); 

    @Mapping(source = "userId", target = "user")
    Funcionario toEntity(FuncionarioDTO funcionarioDTO); 
    default Funcionario fromId(Long id) {
        if (id == null) {
            return null;
        }
        Funcionario funcionario = new Funcionario();
        funcionario.setId(id);
        return funcionario;
    }
}
