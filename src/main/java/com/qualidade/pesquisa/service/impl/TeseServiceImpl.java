package com.qualidade.pesquisa.service.impl;

import com.qualidade.pesquisa.service.TeseService;
import com.qualidade.pesquisa.domain.Tese;
import com.qualidade.pesquisa.repository.TeseRepository;
import com.qualidade.pesquisa.service.dto.TeseDTO;
import com.qualidade.pesquisa.service.mapper.TeseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Tese.
 */
@Service
@Transactional
public class TeseServiceImpl implements TeseService{

    private final Logger log = LoggerFactory.getLogger(TeseServiceImpl.class);

    private final TeseRepository teseRepository;

    private final TeseMapper teseMapper;

    public TeseServiceImpl(TeseRepository teseRepository, TeseMapper teseMapper) {
        this.teseRepository = teseRepository;
        this.teseMapper = teseMapper;
    }

    /**
     * Save a tese.
     *
     * @param teseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TeseDTO save(TeseDTO teseDTO) {
        log.debug("Request to save Tese : {}", teseDTO);
        Tese tese = teseMapper.toEntity(teseDTO);
        tese = teseRepository.save(tese);
        return teseMapper.toDto(tese);
    }

    /**
     *  Get all the tese.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TeseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Tese");
        return teseRepository.findAll(pageable)
            .map(teseMapper::toDto);
    }

    /**
     *  Get one tese by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TeseDTO findOne(Long id) {
        log.debug("Request to get Tese : {}", id);
        Tese tese = teseRepository.findOne(id);
        return teseMapper.toDto(tese);
    }

    /**
     *  Delete the  tese by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tese : {}", id);
        teseRepository.delete(id);
    }
}
