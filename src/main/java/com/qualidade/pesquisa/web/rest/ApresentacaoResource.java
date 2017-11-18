package com.qualidade.pesquisa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.qualidade.pesquisa.service.ApresentacaoService;
import com.qualidade.pesquisa.service.PropostaTeseService;
import com.qualidade.pesquisa.service.TeseService;
import com.qualidade.pesquisa.web.rest.util.HeaderUtil;
import com.qualidade.pesquisa.web.rest.util.PaginationUtil;
import com.qualidade.pesquisa.service.dto.ApresentacaoDTO;
import com.qualidade.pesquisa.service.dto.PropostaTeseDTO;
import com.qualidade.pesquisa.service.dto.TeseDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Apresentacao.
 */
@RestController
@RequestMapping("/api")
public class ApresentacaoResource {

    private final Logger log = LoggerFactory.getLogger(ApresentacaoResource.class);

    private static final String ENTITY_NAME = "apresentacao";

    private final ApresentacaoService apresentacaoService;
    private final PropostaTeseService propostaService;
    private final TeseService teseService;

    public ApresentacaoResource(ApresentacaoService apresentacaoService, PropostaTeseService propostaService, TeseService teseService) {
        this.apresentacaoService = apresentacaoService;
        this.propostaService = propostaService;
        this.teseService = teseService;
    }

    /**
     * POST  /apresentacaos : Create a new apresentacao.
     *
     * @param apresentacaoDTO the apresentacaoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new apresentacaoDTO, or with status 400 (Bad Request) if the apresentacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/apresentacaos")
    @Timed
    public ResponseEntity<ApresentacaoDTO> createApresentacao(@Valid @RequestBody ApresentacaoDTO apresentacaoDTO) throws URISyntaxException {
        log.debug("REST request to save Apresentacao : {}", apresentacaoDTO);
        if (apresentacaoDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new apresentacao cannot already have an ID")).body(null);
        }


        
        ApresentacaoDTO result = apresentacaoService.save(apresentacaoDTO);


        if (apresentacaoDTO.isFlgproposta()){
            PropostaTeseDTO propostaDTO = propostaService.findOne(apresentacaoDTO.getIdTeseProposta());
            propostaDTO.setApresentacaoId(result.getId());
            propostaService.save(propostaDTO); 
        } else {
            TeseDTO teseDTO = teseService.findOne(apresentacaoDTO.getIdTeseProposta());
            teseDTO.setApresentacaoId(result.getId());
            teseService.save(teseDTO);
        }

        return ResponseEntity.created(new URI("/api/apresentacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /apresentacaos : Updates an existing apresentacao.
     *
     * @param apresentacaoDTO the apresentacaoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated apresentacaoDTO,
     * or with status 400 (Bad Request) if the apresentacaoDTO is not valid,
     * or with status 500 (Internal Server Error) if the apresentacaoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/apresentacaos")
    @Timed
    public ResponseEntity<ApresentacaoDTO> updateApresentacao(@Valid @RequestBody ApresentacaoDTO apresentacaoDTO) throws URISyntaxException {
        log.debug("REST request to update Apresentacao : {}", apresentacaoDTO);
        if (apresentacaoDTO.getId() == null) {
            return createApresentacao(apresentacaoDTO);
        }
        ApresentacaoDTO result = apresentacaoService.save(apresentacaoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, apresentacaoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /apresentacaos : get all the apresentacaos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of apresentacaos in body
     */
    @GetMapping("/apresentacaos")
    @Timed
    public ResponseEntity<List<ApresentacaoDTO>> getAllApresentacaos(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Apresentacaos");
        Page<ApresentacaoDTO> page = apresentacaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/apresentacaos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /apresentacaos/:id : get the "id" apresentacao.
     *
     * @param id the id of the apresentacaoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the apresentacaoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/apresentacaos/{id}")
    @Timed
    public ResponseEntity<ApresentacaoDTO> getApresentacao(@PathVariable Long id) {
        log.debug("REST request to get Apresentacao : {}", id);
        ApresentacaoDTO apresentacaoDTO = apresentacaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(apresentacaoDTO));
    }

    /**
     * DELETE  /apresentacaos/:id : delete the "id" apresentacao.
     *
     * @param id the id of the apresentacaoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/apresentacaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteApresentacao(@PathVariable Long id) {
        log.debug("REST request to delete Apresentacao : {}", id);
        apresentacaoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
