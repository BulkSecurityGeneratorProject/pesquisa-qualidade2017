package com.qualidade.pesquisa.service;

import com.qualidade.pesquisa.service.dto.AreaPesquisaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing AreaPesquisa.
 */
public interface AreaPesquisaService {

    /**
     * Save a areaPesquisa.
     *
     * @param areaPesquisaDTO the entity to save
     * @return the persisted entity
     */
    AreaPesquisaDTO save(AreaPesquisaDTO areaPesquisaDTO);

    /**
     *  Get all the areaPesquisas.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<AreaPesquisaDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" areaPesquisa.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    AreaPesquisaDTO findOne(Long id);

    /**
     *  Delete the "id" areaPesquisa.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
