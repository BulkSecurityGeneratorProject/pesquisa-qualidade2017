package com.qualidade.pesquisa.service.mapper;

import com.qualidade.pesquisa.domain.*;
import com.qualidade.pesquisa.service.dto.ApresentacaoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Apresentacao and its DTO ApresentacaoDTO.
 */
@Mapper(componentModel = "spring", uses = {BancaMapper.class, })
public interface ApresentacaoMapper extends EntityMapper <ApresentacaoDTO, Apresentacao> {

    @Mapping(source = "banca.id", target = "bancaId")
    ApresentacaoDTO toDto(Apresentacao apresentacao); 

    @Mapping(source = "bancaId", target = "banca")
    Apresentacao toEntity(ApresentacaoDTO apresentacaoDTO); 
    default Apresentacao fromId(Long id) {
        if (id == null) {
            return null;
        }
        Apresentacao apresentacao = new Apresentacao();
        apresentacao.setId(id);
        return apresentacao;
    }
}
