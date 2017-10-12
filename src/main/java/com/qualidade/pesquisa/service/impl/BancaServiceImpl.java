package com.qualidade.pesquisa.service.impl;

import com.qualidade.pesquisa.service.BancaService;
import com.qualidade.pesquisa.domain.Banca;
import com.qualidade.pesquisa.repository.BancaRepository;
import com.qualidade.pesquisa.service.dto.BancaDTO;
import com.qualidade.pesquisa.service.mapper.BancaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Banca.
 */
@Service
@Transactional
public class BancaServiceImpl implements BancaService{

    private final Logger log = LoggerFactory.getLogger(BancaServiceImpl.class);

    private final BancaRepository bancaRepository;

    private final BancaMapper bancaMapper;

    public BancaServiceImpl(BancaRepository bancaRepository, BancaMapper bancaMapper) {
        this.bancaRepository = bancaRepository;
        this.bancaMapper = bancaMapper;
    }

    /**
     * Save a banca.
     *
     * @param bancaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BancaDTO save(BancaDTO bancaDTO) {
        log.debug("Request to save Banca : {}", bancaDTO);
        Banca banca = bancaMapper.toEntity(bancaDTO);
        banca = bancaRepository.save(banca);
        return bancaMapper.toDto(banca);
    }

    /**
     *  Get all the bancas.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BancaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Bancas");
        return bancaRepository.findAll(pageable)
            .map(bancaMapper::toDto);
    }

    /**
     *  Get one banca by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BancaDTO findOne(Long id) {
        log.debug("Request to get Banca : {}", id);
        Banca banca = bancaRepository.findOne(id);
        return bancaMapper.toDto(banca);
    }

    /**
     *  Delete the  banca by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Banca : {}", id);
        bancaRepository.delete(id);
    }
}
