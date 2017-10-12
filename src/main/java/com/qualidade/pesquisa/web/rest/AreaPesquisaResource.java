package com.qualidade.pesquisa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.qualidade.pesquisa.service.AreaPesquisaService;
import com.qualidade.pesquisa.web.rest.util.HeaderUtil;
import com.qualidade.pesquisa.web.rest.util.PaginationUtil;
import com.qualidade.pesquisa.service.dto.AreaPesquisaDTO;
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
 * REST controller for managing AreaPesquisa.
 */
@RestController
@RequestMapping("/api")
public class AreaPesquisaResource {

    private final Logger log = LoggerFactory.getLogger(AreaPesquisaResource.class);

    private static final String ENTITY_NAME = "areaPesquisa";

    private final AreaPesquisaService areaPesquisaService;

    public AreaPesquisaResource(AreaPesquisaService areaPesquisaService) {
        this.areaPesquisaService = areaPesquisaService;
    }

    /**
     * POST  /area-pesquisas : Create a new areaPesquisa.
     *
     * @param areaPesquisaDTO the areaPesquisaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new areaPesquisaDTO, or with status 400 (Bad Request) if the areaPesquisa has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/area-pesquisas")
    @Timed
    public ResponseEntity<AreaPesquisaDTO> createAreaPesquisa(@RequestBody AreaPesquisaDTO areaPesquisaDTO) throws URISyntaxException {
        log.debug("REST request to save AreaPesquisa : {}", areaPesquisaDTO);
        if (areaPesquisaDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new areaPesquisa cannot already have an ID")).body(null);
        }
        AreaPesquisaDTO result = areaPesquisaService.save(areaPesquisaDTO);
        return ResponseEntity.created(new URI("/api/area-pesquisas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /area-pesquisas : Updates an existing areaPesquisa.
     *
     * @param areaPesquisaDTO the areaPesquisaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated areaPesquisaDTO,
     * or with status 400 (Bad Request) if the areaPesquisaDTO is not valid,
     * or with status 500 (Internal Server Error) if the areaPesquisaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/area-pesquisas")
    @Timed
    public ResponseEntity<AreaPesquisaDTO> updateAreaPesquisa(@RequestBody AreaPesquisaDTO areaPesquisaDTO) throws URISyntaxException {
        log.debug("REST request to update AreaPesquisa : {}", areaPesquisaDTO);
        if (areaPesquisaDTO.getId() == null) {
            return createAreaPesquisa(areaPesquisaDTO);
        }
        AreaPesquisaDTO result = areaPesquisaService.save(areaPesquisaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, areaPesquisaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /area-pesquisas : get all the areaPesquisas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of areaPesquisas in body
     */
    @GetMapping("/area-pesquisas")
    @Timed
    public ResponseEntity<List<AreaPesquisaDTO>> getAllAreaPesquisas(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of AreaPesquisas");
        Page<AreaPesquisaDTO> page = areaPesquisaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/area-pesquisas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /area-pesquisas/:id : get the "id" areaPesquisa.
     *
     * @param id the id of the areaPesquisaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the areaPesquisaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/area-pesquisas/{id}")
    @Timed
    public ResponseEntity<AreaPesquisaDTO> getAreaPesquisa(@PathVariable Long id) {
        log.debug("REST request to get AreaPesquisa : {}", id);
        AreaPesquisaDTO areaPesquisaDTO = areaPesquisaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(areaPesquisaDTO));
    }

    /**
     * DELETE  /area-pesquisas/:id : delete the "id" areaPesquisa.
     *
     * @param id the id of the areaPesquisaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/area-pesquisas/{id}")
    @Timed
    public ResponseEntity<Void> deleteAreaPesquisa(@PathVariable Long id) {
        log.debug("REST request to delete AreaPesquisa : {}", id);
        areaPesquisaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
