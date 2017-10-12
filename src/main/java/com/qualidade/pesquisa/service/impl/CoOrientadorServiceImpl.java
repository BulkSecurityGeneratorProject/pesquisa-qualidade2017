package com.qualidade.pesquisa.service.impl;

import com.qualidade.pesquisa.service.CoOrientadorService;
import com.qualidade.pesquisa.domain.CoOrientador;
import com.qualidade.pesquisa.repository.CoOrientadorRepository;
import com.qualidade.pesquisa.service.dto.CoOrientadorDTO;
import com.qualidade.pesquisa.service.mapper.CoOrientadorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CoOrientador.
 */
@Service
@Transactional
public class CoOrientadorServiceImpl implements CoOrientadorService{

    private final Logger log = LoggerFactory.getLogger(CoOrientadorServiceImpl.class);

    private final CoOrientadorRepository coOrientadorRepository;

    private final CoOrientadorMapper coOrientadorMapper;

    public CoOrientadorServiceImpl(CoOrientadorRepository coOrientadorRepository, CoOrientadorMapper coOrientadorMapper) {
        this.coOrientadorRepository = coOrientadorRepository;
        this.coOrientadorMapper = coOrientadorMapper;
    }

    /**
     * Save a coOrientador.
     *
     * @param coOrientadorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CoOrientadorDTO save(CoOrientadorDTO coOrientadorDTO) {
        log.debug("Request to save CoOrientador : {}", coOrientadorDTO);
        CoOrientador coOrientador = coOrientadorMapper.toEntity(coOrientadorDTO);
        coOrientador = coOrientadorRepository.save(coOrientador);
        return coOrientadorMapper.toDto(coOrientador);
    }

    /**
     *  Get all the coOrientadors.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CoOrientadorDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CoOrientadors");
        return coOrientadorRepository.findAll(pageable)
            .map(coOrientadorMapper::toDto);
    }

    /**
     *  Get one coOrientador by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CoOrientadorDTO findOne(Long id) {
        log.debug("Request to get CoOrientador : {}", id);
        CoOrientador coOrientador = coOrientadorRepository.findOne(id);
        return coOrientadorMapper.toDto(coOrientador);
    }

    /**
     *  Delete the  coOrientador by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CoOrientador : {}", id);
        coOrientadorRepository.delete(id);
    }
}
