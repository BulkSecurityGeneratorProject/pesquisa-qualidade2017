package com.qualidade.pesquisa.service;

import com.qualidade.pesquisa.service.dto.PropostaTeseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing PropostaTese.
 */
public interface PropostaTeseService {

    /**
     * Save a propostaTese.
     *
     * @param propostaTeseDTO the entity to save
     * @return the persisted entity
     */
    PropostaTeseDTO save(PropostaTeseDTO propostaTeseDTO);

    /**
     *  Get all the propostaTese.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PropostaTeseDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" propostaTese.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PropostaTeseDTO findOne(Long id);

    /**
     *  Delete the "id" propostaTese.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
