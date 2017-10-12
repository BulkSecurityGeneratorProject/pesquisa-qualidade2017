package com.qualidade.pesquisa.service;

import com.qualidade.pesquisa.service.dto.BancaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Banca.
 */
public interface BancaService {

    /**
     * Save a banca.
     *
     * @param bancaDTO the entity to save
     * @return the persisted entity
     */
    BancaDTO save(BancaDTO bancaDTO);

    /**
     *  Get all the bancas.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<BancaDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" banca.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    BancaDTO findOne(Long id);

    /**
     *  Delete the "id" banca.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
