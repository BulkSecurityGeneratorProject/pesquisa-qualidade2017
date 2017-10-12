package com.qualidade.pesquisa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.qualidade.pesquisa.service.ProfessorBancaService;
import com.qualidade.pesquisa.web.rest.util.HeaderUtil;
import com.qualidade.pesquisa.web.rest.util.PaginationUtil;
import com.qualidade.pesquisa.service.dto.ProfessorBancaDTO;
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
 * REST controller for managing ProfessorBanca.
 */
@RestController
@RequestMapping("/api")
public class ProfessorBancaResource {

    private final Logger log = LoggerFactory.getLogger(ProfessorBancaResource.class);

    private static final String ENTITY_NAME = "professorBanca";

    private final ProfessorBancaService professorBancaService;

    public ProfessorBancaResource(ProfessorBancaService professorBancaService) {
        this.professorBancaService = professorBancaService;
    }

    /**
     * POST  /professor-bancas : Create a new professorBanca.
     *
     * @param professorBancaDTO the professorBancaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new professorBancaDTO, or with status 400 (Bad Request) if the professorBanca has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/professor-bancas")
    @Timed
    public ResponseEntity<ProfessorBancaDTO> createProfessorBanca(@RequestBody ProfessorBancaDTO professorBancaDTO) throws URISyntaxException {
        log.debug("REST request to save ProfessorBanca : {}", professorBancaDTO);
        if (professorBancaDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new professorBanca cannot already have an ID")).body(null);
        }
        ProfessorBancaDTO result = professorBancaService.save(professorBancaDTO);
        return ResponseEntity.created(new URI("/api/professor-bancas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /professor-bancas : Updates an existing professorBanca.
     *
     * @param professorBancaDTO the professorBancaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated professorBancaDTO,
     * or with status 400 (Bad Request) if the professorBancaDTO is not valid,
     * or with status 500 (Internal Server Error) if the professorBancaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/professor-bancas")
    @Timed
    public ResponseEntity<ProfessorBancaDTO> updateProfessorBanca(@RequestBody ProfessorBancaDTO professorBancaDTO) throws URISyntaxException {
        log.debug("REST request to update ProfessorBanca : {}", professorBancaDTO);
        if (professorBancaDTO.getId() == null) {
            return createProfessorBanca(professorBancaDTO);
        }
        ProfessorBancaDTO result = professorBancaService.save(professorBancaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, professorBancaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /professor-bancas : get all the professorBancas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of professorBancas in body
     */
    @GetMapping("/professor-bancas")
    @Timed
    public ResponseEntity<List<ProfessorBancaDTO>> getAllProfessorBancas(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ProfessorBancas");
        Page<ProfessorBancaDTO> page = professorBancaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/professor-bancas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /professor-bancas/:id : get the "id" professorBanca.
     *
     * @param id the id of the professorBancaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the professorBancaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/professor-bancas/{id}")
    @Timed
    public ResponseEntity<ProfessorBancaDTO> getProfessorBanca(@PathVariable Long id) {
        log.debug("REST request to get ProfessorBanca : {}", id);
        ProfessorBancaDTO professorBancaDTO = professorBancaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(professorBancaDTO));
    }

    /**
     * DELETE  /professor-bancas/:id : delete the "id" professorBanca.
     *
     * @param id the id of the professorBancaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/professor-bancas/{id}")
    @Timed
    public ResponseEntity<Void> deleteProfessorBanca(@PathVariable Long id) {
        log.debug("REST request to delete ProfessorBanca : {}", id);
        professorBancaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
