package com.qualidade.pesquisa.service;

import com.qualidade.pesquisa.service.dto.ArtigoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Artigo.
 */
public interface ArtigoService {

    /**
     * Save a artigo.
     *
     * @param artigoDTO the entity to save
     * @return the persisted entity
     */
    ArtigoDTO save(ArtigoDTO artigoDTO);

    /**
     *  Get all the artigos.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ArtigoDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" artigo.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ArtigoDTO findOne(Long id);

    /**
     *  Delete the "id" artigo.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
