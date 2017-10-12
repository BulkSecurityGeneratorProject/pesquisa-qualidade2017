package com.qualidade.pesquisa.service;

import com.qualidade.pesquisa.service.dto.ProfessorBancaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ProfessorBanca.
 */
public interface ProfessorBancaService {

    /**
     * Save a professorBanca.
     *
     * @param professorBancaDTO the entity to save
     * @return the persisted entity
     */
    ProfessorBancaDTO save(ProfessorBancaDTO professorBancaDTO);

    /**
     *  Get all the professorBancas.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ProfessorBancaDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" professorBanca.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ProfessorBancaDTO findOne(Long id);

    /**
     *  Delete the "id" professorBanca.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
