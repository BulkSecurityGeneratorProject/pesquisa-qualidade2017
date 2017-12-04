package com.qualidade.pesquisa.service.impl;

import com.qualidade.pesquisa.service.ProfessorService;
import com.qualidade.pesquisa.domain.Professor;
import com.qualidade.pesquisa.repository.ProfessorRepository;
import com.qualidade.pesquisa.service.dto.ProfessorDTO;
import com.qualidade.pesquisa.service.mapper.ProfessorMapper;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Professor.
 */
@Service
@Transactional
public class ProfessorServiceImpl implements ProfessorService{

    private final Logger log = LoggerFactory.getLogger(ProfessorServiceImpl.class);

    private final ProfessorRepository professorRepository;

    private final ProfessorMapper professorMapper;

    public ProfessorServiceImpl(ProfessorRepository professorRepository, ProfessorMapper professorMapper) {
        this.professorRepository = professorRepository;
        this.professorMapper = professorMapper;
    }

    /**
     * Save a professor.
     *
     * @param professorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProfessorDTO save(ProfessorDTO professorDTO) {
        log.debug("Request to save Professor : {}", professorDTO);
        Professor professor = professorMapper.toEntity(professorDTO);
        professor = professorRepository.save(professor);
        return professorMapper.toDto(professor);
    }

    /**
     *  Get all the professors.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProfessorDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Professors");
        return professorRepository.findAll(pageable)
            .map(professorMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProfessorDTO> findByBanca(Long idBanca, Pageable pageable) {
        return professorRepository.findByIdBanca(idBanca, pageable)
            .map(professorMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProfessorDTO> findNaoConvidadosBanca(Long idBanca, Pageable pageable) {
        return professorRepository.findNaoConvidadosBanca(idBanca, pageable)
            .map(professorMapper::toDto);
    }

    

    

    /**
     *  Get one professor by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProfessorDTO findOne(Long id) {
        log.debug("Request to get Professor : {}", id);
        Professor professor = professorRepository.findOne(id);
        return professorMapper.toDto(professor);
    }

    @Override
    @Transactional(readOnly = true)
    public ProfessorDTO findByUserId(Long userId) {
        log.debug("Request to get Professor : {}", userId);
        Professor professor = professorRepository.findByUserId(userId);
        return professorMapper.toDto(professor);
    }


    /**
     *  Delete the  professor by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Professor : {}", id);
        professorRepository.delete(id);
    }
}
