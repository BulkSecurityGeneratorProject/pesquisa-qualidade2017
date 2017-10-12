package com.qualidade.pesquisa.service;

import com.qualidade.pesquisa.service.dto.CoOrientadorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing CoOrientador.
 */
public interface CoOrientadorService {

    /**
     * Save a coOrientador.
     *
     * @param coOrientadorDTO the entity to save
     * @return the persisted entity
     */
    CoOrientadorDTO save(CoOrientadorDTO coOrientadorDTO);

    /**
     *  Get all the coOrientadors.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<CoOrientadorDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" coOrientador.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    CoOrientadorDTO findOne(Long id);

    /**
     *  Delete the "id" coOrientador.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
