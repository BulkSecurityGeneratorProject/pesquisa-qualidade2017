package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.FuncionarioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Funcionario and its DTO FuncionarioDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FuncionarioMapper extends EntityMapper <FuncionarioDTO, Funcionario> {
    
    
    default Funcionario fromId(Long id) {
        if (id == null) {
            return null;
        }
        Funcionario funcionario = new Funcionario();
        funcionario.setId(id);
        return funcionario;
    }
}
