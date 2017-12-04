package com.qualidade.pesquisa.service;

import com.qualidade.pesquisa.service.dto.ProfessorDTO;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Professor.
 */
public interface ProfessorService {

    /**
     * Save a professor.
     *
     * @param professorDTO the entity to save
     * @return the persisted entity
     */
    ProfessorDTO save(ProfessorDTO professorDTO);

    /**
     *  Get all the professors.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ProfessorDTO> findAll(Pageable pageable);    
    Page<ProfessorDTO> findByBanca(Long idBanca, Pageable pageable);
    Page<ProfessorDTO> findNaoConvidadosBanca(Long idBanca, Pageable pageable);
    
    

    /**
     *  Get the "id" professor.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ProfessorDTO findOne(Long id);
    ProfessorDTO findByUserId(Long userId);

    /**
     *  Delete the "id" professor.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
