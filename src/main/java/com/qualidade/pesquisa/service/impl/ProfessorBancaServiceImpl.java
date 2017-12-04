package com.qualidade.pesquisa.service.impl;

import com.qualidade.pesquisa.service.ProfessorBancaService;
import com.qualidade.pesquisa.domain.ProfessorBanca;
import com.qualidade.pesquisa.repository.ProfessorBancaRepository;
import com.qualidade.pesquisa.service.dto.ProfessorBancaDTO;
import com.qualidade.pesquisa.service.mapper.ProfessorBancaMapper;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ProfessorBanca.
 */
@Service
@Transactional
public class ProfessorBancaServiceImpl implements ProfessorBancaService{

    private final Logger log = LoggerFactory.getLogger(ProfessorBancaServiceImpl.class);

    private final ProfessorBancaRepository professorBancaRepository;

    private final ProfessorBancaMapper professorBancaMapper;

    public ProfessorBancaServiceImpl(ProfessorBancaRepository professorBancaRepository, ProfessorBancaMapper professorBancaMapper) {
        this.professorBancaRepository = professorBancaRepository;
        this.professorBancaMapper = professorBancaMapper;
    }

    /**
     * Save a professorBanca.
     *
     * @param professorBancaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProfessorBancaDTO save(ProfessorBancaDTO professorBancaDTO) {
        log.debug("Request to save ProfessorBanca : {}", professorBancaDTO);
        ProfessorBanca professorBanca = professorBancaMapper.toEntity(professorBancaDTO);
        professorBanca = professorBancaRepository.save(professorBanca);
        return professorBancaMapper.toDto(professorBanca);
    }

    /**
     *  Get all the professorBancas.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProfessorBancaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProfessorBancas");
        return professorBancaRepository.findAll(pageable)
            .map(professorBancaMapper::toDto);
    }



    /**
     *  Get one professorBanca by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProfessorBancaDTO findOne(Long id) {
        log.debug("Request to get ProfessorBanca : {}", id);
        ProfessorBanca professorBanca = professorBancaRepository.findOne(id);
        return professorBancaMapper.toDto(professorBanca);
    }
    
    @Override
    @Transactional(readOnly = true)
    public ProfessorBancaDTO findByBancaProfessor(ProfessorBancaDTO professorBancaDTO){
        ProfessorBanca professorBanca = professorBancaRepository.findByBancaProfessor(professorBancaDTO.getProfessorId(), professorBancaDTO.getBancaId());
        return professorBancaMapper.toDto(professorBanca);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProfessorBancaDTO> findAllByUserId(Long userId, Pageable pageable) {
        return professorBancaRepository.findAllByUserId(userId, pageable)
            .map(professorBancaMapper::toDto);
    }
    

    
    /**
     *  Delete the  professorBanca by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProfessorBanca : {}", id);
        professorBancaRepository.delete(id);
    }
}
