package com.qualidade.pesquisa.service;

import com.qualidade.pesquisa.service.dto.ApresentacaoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Apresentacao.
 */
public interface ApresentacaoService {

    /**
     * Save a apresentacao.
     *
     * @param apresentacaoDTO the entity to save
     * @return the persisted entity
     */
    ApresentacaoDTO save(ApresentacaoDTO apresentacaoDTO);

    /**
     *  Get all the apresentacaos.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ApresentacaoDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" apresentacao.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ApresentacaoDTO findOne(Long id);

    /**
     *  Delete the "id" apresentacao.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
