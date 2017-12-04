package com.qualidade.pesquisa.service.impl;

import com.qualidade.pesquisa.service.ApresentacaoService;
import com.qualidade.pesquisa.domain.Apresentacao;
import com.qualidade.pesquisa.repository.ApresentacaoRepository;
import com.qualidade.pesquisa.service.dto.ApresentacaoDTO;
import com.qualidade.pesquisa.service.mapper.ApresentacaoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Apresentacao.
 */
@Service
@Transactional
public class ApresentacaoServiceImpl implements ApresentacaoService{

    private final Logger log = LoggerFactory.getLogger(ApresentacaoServiceImpl.class);

    private final ApresentacaoRepository apresentacaoRepository;

    private final ApresentacaoMapper apresentacaoMapper;

    public ApresentacaoServiceImpl(ApresentacaoRepository apresentacaoRepository, ApresentacaoMapper apresentacaoMapper) {
        this.apresentacaoRepository = apresentacaoRepository;
        this.apresentacaoMapper = apresentacaoMapper;
    }

    /**
     * Save a apresentacao.
     *
     * @param apresentacaoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ApresentacaoDTO save(ApresentacaoDTO apresentacaoDTO) {
        log.debug("Request to save Apresentacao : {}", apresentacaoDTO);
        Apresentacao apresentacao = apresentacaoMapper.toEntity(apresentacaoDTO);
        apresentacao = apresentacaoRepository.save(apresentacao);
        return apresentacaoMapper.toDto(apresentacao);
    }

    /**
     *  Get all the apresentacaos.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ApresentacaoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Apresentacaos");
        return apresentacaoRepository.findAll(pageable)
            .map(apresentacaoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ApresentacaoDTO> findAllByIdProfessor(Long idProfessor, Pageable pageable){
        log.debug("Request to get all Apresentacaos");
        return apresentacaoRepository.findAllByIdProfessor(idProfessor, pageable)
            .map(apresentacaoMapper::toDto);
    }

    /**
     *  Get one apresentacao by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ApresentacaoDTO findOne(Long id) {
        log.debug("Request to get Apresentacao : {}", id);
        Apresentacao apresentacao = apresentacaoRepository.findOne(id);
        return apresentacaoMapper.toDto(apresentacao);
    }

    /**
     *  Delete the  apresentacao by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Apresentacao : {}", id);
        apresentacaoRepository.delete(id);
    }
}
