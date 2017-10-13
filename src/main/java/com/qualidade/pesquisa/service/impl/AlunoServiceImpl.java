package com.qualidade.pesquisa.service.impl;

import com.qualidade.pesquisa.service.AlunoService;
import com.qualidade.pesquisa.domain.Aluno;
import com.qualidade.pesquisa.repository.AlunoRepository;
import com.qualidade.pesquisa.service.dto.AlunoDTO;
import com.qualidade.pesquisa.service.mapper.AlunoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Aluno.
 */
@Service
@Transactional
public class AlunoServiceImpl implements AlunoService{

    private final Logger log = LoggerFactory.getLogger(AlunoServiceImpl.class);

    private final AlunoRepository alunoRepository;

    private final AlunoMapper alunoMapper;

    public AlunoServiceImpl(AlunoRepository alunoRepository, AlunoMapper alunoMapper) {
        this.alunoRepository = alunoRepository;
        this.alunoMapper = alunoMapper;
    }

    /**
     * Save a aluno.
     *
     * @param alunoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AlunoDTO save(AlunoDTO alunoDTO) {
        log.debug("Request to save Aluno : {}", alunoDTO);
        Aluno aluno = alunoMapper.toEntity(alunoDTO);
        aluno = alunoRepository.save(aluno);
        return alunoMapper.toDto(aluno);
    }

    /**
     *  Get all the alunos.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AlunoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Alunos");
        return alunoRepository.findAll(pageable)
            .map(alunoMapper::toDto);
    }

    /**
     *  Get one aluno by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AlunoDTO findOne(Long id) {
        log.debug("Request to get Aluno : {}", id);
        Aluno aluno = alunoRepository.findOne(id);
        return alunoMapper.toDto(aluno);
    }

    /**
     *  Delete the  aluno by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Aluno : {}", id);
        alunoRepository.delete(id);
    }
}
