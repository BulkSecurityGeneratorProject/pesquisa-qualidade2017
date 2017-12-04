package com.qualidade.pesquisa.service;

import com.qualidade.pesquisa.service.dto.TeseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Tese.
 */
public interface TeseService {

    /**
     * Save a tese.
     *
     * @param teseDTO the entity to save
     * @return the persisted entity
     */
    TeseDTO save(TeseDTO teseDTO);

    /**
     *  Get all the tese.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<TeseDTO> findAll(Pageable pageable);
    Page<TeseDTO> findAllProfessorByUserId(Long userId,Pageable pageable);
    Page<TeseDTO> findAllAlunoByUserId(Long userId,Pageable pageable);

    

    /**
     *  Get the "id" tese.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    TeseDTO findOne(Long id);

    /**
     *  Delete the "id" tese.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
