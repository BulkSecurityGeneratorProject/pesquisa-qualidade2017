package com.qualidade.pesquisa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.qualidade.pesquisa.service.BancaService;
import com.qualidade.pesquisa.web.rest.util.HeaderUtil;
import com.qualidade.pesquisa.web.rest.util.PaginationUtil;
import com.qualidade.pesquisa.service.dto.BancaDTO;
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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Banca.
 */
@RestController
@RequestMapping("/api")
public class BancaResource {

    private final Logger log = LoggerFactory.getLogger(BancaResource.class);

    private static final String ENTITY_NAME = "banca";

    private final BancaService bancaService;

    public BancaResource(BancaService bancaService) {
        this.bancaService = bancaService;
    }

    /**
     * POST  /bancas : Create a new banca.
     *
     * @param bancaDTO the bancaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bancaDTO, or with status 400 (Bad Request) if the banca has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bancas")
    @Timed
    public ResponseEntity<BancaDTO> createBanca(@RequestBody BancaDTO bancaDTO) throws URISyntaxException {
        log.debug("REST request to save Banca : {}", bancaDTO);
        if (bancaDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new banca cannot already have an ID")).body(null);
        }
        BancaDTO result = bancaService.save(bancaDTO);
        return ResponseEntity.created(new URI("/api/bancas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bancas : Updates an existing banca.
     *
     * @param bancaDTO the bancaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bancaDTO,
     * or with status 400 (Bad Request) if the bancaDTO is not valid,
     * or with status 500 (Internal Server Error) if the bancaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bancas")
    @Timed
    public ResponseEntity<BancaDTO> updateBanca(@RequestBody BancaDTO bancaDTO) throws URISyntaxException {
        log.debug("REST request to update Banca : {}", bancaDTO);
        if (bancaDTO.getId() == null) {
            return createBanca(bancaDTO);
        }
        BancaDTO result = bancaService.save(bancaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bancaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bancas : get all the bancas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of bancas in body
     */
    @GetMapping("/bancas")
    @Timed
    public ResponseEntity<List<BancaDTO>> getAllBancas(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Bancas");
        Page<BancaDTO> page = bancaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/bancas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /bancas/:id : get the "id" banca.
     *
     * @param id the id of the bancaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bancaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/bancas/{id}")
    @Timed
    public ResponseEntity<BancaDTO> getBanca(@PathVariable Long id) {
        log.debug("REST request to get Banca : {}", id);
        BancaDTO bancaDTO = bancaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bancaDTO));
    }

    /**
     * DELETE  /bancas/:id : delete the "id" banca.
     *
     * @param id the id of the bancaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bancas/{id}")
    @Timed
    public ResponseEntity<Void> deleteBanca(@PathVariable Long id) {
        log.debug("REST request to delete Banca : {}", id);
        bancaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
