package com.qualidade.pesquisa.service.impl;

import com.qualidade.pesquisa.service.AreaPesquisaService;
import com.qualidade.pesquisa.domain.AreaPesquisa;
import com.qualidade.pesquisa.repository.AreaPesquisaRepository;
import com.qualidade.pesquisa.service.dto.AreaPesquisaDTO;
import com.qualidade.pesquisa.service.mapper.AreaPesquisaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing AreaPesquisa.
 */
@Service
@Transactional
public class AreaPesquisaServiceImpl implements AreaPesquisaService{

    private final Logger log = LoggerFactory.getLogger(AreaPesquisaServiceImpl.class);

    private final AreaPesquisaRepository areaPesquisaRepository;

    private final AreaPesquisaMapper areaPesquisaMapper;

    public AreaPesquisaServiceImpl(AreaPesquisaRepository areaPesquisaRepository, AreaPesquisaMapper areaPesquisaMapper) {
        this.areaPesquisaRepository = areaPesquisaRepository;
        this.areaPesquisaMapper = areaPesquisaMapper;
    }

    /**
     * Save a areaPesquisa.
     *
     * @param areaPesquisaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AreaPesquisaDTO save(AreaPesquisaDTO areaPesquisaDTO) {
        log.debug("Request to save AreaPesquisa : {}", areaPesquisaDTO);
        AreaPesquisa areaPesquisa = areaPesquisaMapper.toEntity(areaPesquisaDTO);
        areaPesquisa = areaPesquisaRepository.save(areaPesquisa);
        return areaPesquisaMapper.toDto(areaPesquisa);
    }

    /**
     *  Get all the areaPesquisas.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AreaPesquisaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AreaPesquisas");
        return areaPesquisaRepository.findAll(pageable)
            .map(areaPesquisaMapper::toDto);
    }

    /**
     *  Get one areaPesquisa by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AreaPesquisaDTO findOne(Long id) {
        log.debug("Request to get AreaPesquisa : {}", id);
        AreaPesquisa areaPesquisa = areaPesquisaRepository.findOne(id);
        return areaPesquisaMapper.toDto(areaPesquisa);
    }

    /**
     *  Delete the  areaPesquisa by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AreaPesquisa : {}", id);
        areaPesquisaRepository.delete(id);
    }
}
