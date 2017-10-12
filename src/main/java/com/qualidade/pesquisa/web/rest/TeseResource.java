package com.qualidade.pesquisa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.qualidade.pesquisa.service.TeseService;
import com.qualidade.pesquisa.web.rest.util.HeaderUtil;
import com.qualidade.pesquisa.web.rest.util.PaginationUtil;
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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tese.
 */
@RestController
@RequestMapping("/api")
public class TeseResource {

    private final Logger log = LoggerFactory.getLogger(TeseResource.class);

    private static final String ENTITY_NAME = "tese";

    private final TeseService teseService;

    public TeseResource(TeseService teseService) {
        this.teseService = teseService;
    }

    /**
     * POST  /tese : Create a new tese.
     *
     * @param teseDTO the teseDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new teseDTO, or with status 400 (Bad Request) if the tese has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tese")
    @Timed
    public ResponseEntity<TeseDTO> createTese(@RequestBody TeseDTO teseDTO) throws URISyntaxException {
        log.debug("REST request to save Tese : {}", teseDTO);
        if (teseDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tese cannot already have an ID")).body(null);
        }
        TeseDTO result = teseService.save(teseDTO);
        return ResponseEntity.created(new URI("/api/tese/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tese : Updates an existing tese.
     *
     * @param teseDTO the teseDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated teseDTO,
     * or with status 400 (Bad Request) if the teseDTO is not valid,
     * or with status 500 (Internal Server Error) if the teseDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tese")
    @Timed
    public ResponseEntity<TeseDTO> updateTese(@RequestBody TeseDTO teseDTO) throws URISyntaxException {
        log.debug("REST request to update Tese : {}", teseDTO);
        if (teseDTO.getId() == null) {
            return createTese(teseDTO);
        }
        TeseDTO result = teseService.save(teseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, teseDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tese : get all the tese.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tese in body
     */
    @GetMapping("/tese")
    @Timed
    public ResponseEntity<List<TeseDTO>> getAllTese(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Tese");
        Page<TeseDTO> page = teseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tese");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tese/:id : get the "id" tese.
     *
     * @param id the id of the teseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the teseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tese/{id}")
    @Timed
    public ResponseEntity<TeseDTO> getTese(@PathVariable Long id) {
        log.debug("REST request to get Tese : {}", id);
        TeseDTO teseDTO = teseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(teseDTO));
    }

    /**
     * DELETE  /tese/:id : delete the "id" tese.
     *
     * @param id the id of the teseDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tese/{id}")
    @Timed
    public ResponseEntity<Void> deleteTese(@PathVariable Long id) {
        log.debug("REST request to delete Tese : {}", id);
        teseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
