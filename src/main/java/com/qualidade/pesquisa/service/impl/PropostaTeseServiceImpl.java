package com.qualidade.pesquisa.service.impl;

import com.qualidade.pesquisa.service.PropostaTeseService;
import com.qualidade.pesquisa.domain.PropostaTese;
import com.qualidade.pesquisa.repository.PropostaTeseRepository;
import com.qualidade.pesquisa.service.dto.PropostaTeseDTO;
import com.qualidade.pesquisa.service.mapper.PropostaTeseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PropostaTese.
 */
@Service
@Transactional
public class PropostaTeseServiceImpl implements PropostaTeseService{

    private final Logger log = LoggerFactory.getLogger(PropostaTeseServiceImpl.class);

    private final PropostaTeseRepository propostaTeseRepository;

    private final PropostaTeseMapper propostaTeseMapper;

    public PropostaTeseServiceImpl(PropostaTeseRepository propostaTeseRepository, PropostaTeseMapper propostaTeseMapper) {
        this.propostaTeseRepository = propostaTeseRepository;
        this.propostaTeseMapper = propostaTeseMapper;
    }

    /**
     * Save a propostaTese.
     *
     * @param propostaTeseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PropostaTeseDTO save(PropostaTeseDTO propostaTeseDTO) {
        log.debug("Request to save PropostaTese : {}", propostaTeseDTO);
        PropostaTese propostaTese = propostaTeseMapper.toEntity(propostaTeseDTO);
        propostaTese = propostaTeseRepository.save(propostaTese);
        return propostaTeseMapper.toDto(propostaTese);
    }

    /**
     *  Get all the propostaTese.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PropostaTeseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PropostaTese");
        return propostaTeseRepository.findAll(pageable)
            .map(propostaTeseMapper::toDto);
    }

    /**
     *  Get one propostaTese by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PropostaTeseDTO findOne(Long id) {
        log.debug("Request to get PropostaTese : {}", id);
        PropostaTese propostaTese = propostaTeseRepository.findOne(id);
        return propostaTeseMapper.toDto(propostaTese);
    }

    /**
     *  Delete the  propostaTese by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PropostaTese : {}", id);
        propostaTeseRepository.delete(id);
    }
}
