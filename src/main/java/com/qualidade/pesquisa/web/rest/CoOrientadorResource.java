package com.qualidade.pesquisa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.qualidade.pesquisa.service.CoOrientadorService;
import com.qualidade.pesquisa.web.rest.util.HeaderUtil;
import com.qualidade.pesquisa.web.rest.util.PaginationUtil;
import com.qualidade.pesquisa.service.dto.CoOrientadorDTO;
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
 * REST controller for managing CoOrientador.
 */
@RestController
@RequestMapping("/api")
public class CoOrientadorResource {

    private final Logger log = LoggerFactory.getLogger(CoOrientadorResource.class);

    private static final String ENTITY_NAME = "coOrientador";

    private final CoOrientadorService coOrientadorService;

    public CoOrientadorResource(CoOrientadorService coOrientadorService) {
        this.coOrientadorService = coOrientadorService;
    }

    /**
     * POST  /co-orientadors : Create a new coOrientador.
     *
     * @param coOrientadorDTO the coOrientadorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new coOrientadorDTO, or with status 400 (Bad Request) if the coOrientador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/co-orientadors")
    @Timed
    public ResponseEntity<CoOrientadorDTO> createCoOrientador(@RequestBody CoOrientadorDTO coOrientadorDTO) throws URISyntaxException {
        log.debug("REST request to save CoOrientador : {}", coOrientadorDTO);
        if (coOrientadorDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new coOrientador cannot already have an ID")).body(null);
        }
        CoOrientadorDTO result = coOrientadorService.save(coOrientadorDTO);
        return ResponseEntity.created(new URI("/api/co-orientadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /co-orientadors : Updates an existing coOrientador.
     *
     * @param coOrientadorDTO the coOrientadorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated coOrientadorDTO,
     * or with status 400 (Bad Request) if the coOrientadorDTO is not valid,
     * or with status 500 (Internal Server Error) if the coOrientadorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/co-orientadors")
    @Timed
    public ResponseEntity<CoOrientadorDTO> updateCoOrientador(@RequestBody CoOrientadorDTO coOrientadorDTO) throws URISyntaxException {
        log.debug("REST request to update CoOrientador : {}", coOrientadorDTO);
        if (coOrientadorDTO.getId() == null) {
            return createCoOrientador(coOrientadorDTO);
        }
        CoOrientadorDTO result = coOrientadorService.save(coOrientadorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, coOrientadorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /co-orientadors : get all the coOrientadors.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of coOrientadors in body
     */
    @GetMapping("/co-orientadors")
    @Timed
    public ResponseEntity<List<CoOrientadorDTO>> getAllCoOrientadors(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of CoOrientadors");
        Page<CoOrientadorDTO> page = coOrientadorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/co-orientadors");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /co-orientadors/:id : get the "id" coOrientador.
     *
     * @param id the id of the coOrientadorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the coOrientadorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/co-orientadors/{id}")
    @Timed
    public ResponseEntity<CoOrientadorDTO> getCoOrientador(@PathVariable Long id) {
        log.debug("REST request to get CoOrientador : {}", id);
        CoOrientadorDTO coOrientadorDTO = coOrientadorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(coOrientadorDTO));
    }

    /**
     * DELETE  /co-orientadors/:id : delete the "id" coOrientador.
     *
     * @param id the id of the coOrientadorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/co-orientadors/{id}")
    @Timed
    public ResponseEntity<Void> deleteCoOrientador(@PathVariable Long id) {
        log.debug("REST request to delete CoOrientador : {}", id);
        coOrientadorService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
