package com.qualidade.pesquisa.service.impl;

import com.qualidade.pesquisa.service.ArtigoService;
import com.qualidade.pesquisa.domain.Artigo;
import com.qualidade.pesquisa.repository.ArtigoRepository;
import com.qualidade.pesquisa.service.dto.ArtigoDTO;
import com.qualidade.pesquisa.service.mapper.ArtigoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Artigo.
 */
@Service
@Transactional
public class ArtigoServiceImpl implements ArtigoService{

    private final Logger log = LoggerFactory.getLogger(ArtigoServiceImpl.class);

    private final ArtigoRepository artigoRepository;

    private final ArtigoMapper artigoMapper;

    public ArtigoServiceImpl(ArtigoRepository artigoRepository, ArtigoMapper artigoMapper) {
        this.artigoRepository = artigoRepository;
        this.artigoMapper = artigoMapper;
    }

    /**
     * Save a artigo.
     *
     * @param artigoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ArtigoDTO save(ArtigoDTO artigoDTO) {
        log.debug("Request to save Artigo : {}", artigoDTO);
        Artigo artigo = artigoMapper.toEntity(artigoDTO);
        artigo = artigoRepository.save(artigo);
        return artigoMapper.toDto(artigo);
    }

    /**
     *  Get all the artigos.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ArtigoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Artigos");
        return artigoRepository.findAll(pageable)
            .map(artigoMapper::toDto);
    }

    /**
     *  Get one artigo by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ArtigoDTO findOne(Long id) {
        log.debug("Request to get Artigo : {}", id);
        Artigo artigo = artigoRepository.findOne(id);
        return artigoMapper.toDto(artigo);
    }

    /**
     *  Delete the  artigo by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Artigo : {}", id);
        artigoRepository.delete(id);
    }
}
