package com.qualidade.pesquisa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.qualidade.pesquisa.service.ArtigoService;
import com.qualidade.pesquisa.service.AlunoService;
import com.qualidade.pesquisa.web.rest.util.HeaderUtil;
import com.qualidade.pesquisa.web.rest.util.PaginationUtil;
import com.qualidade.pesquisa.service.dto.ArtigoDTO;
import com.qualidade.pesquisa.service.dto.AlunoDTO;
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
 * REST controller for managing Artigo.
 */
@RestController
@RequestMapping("/api")
public class ArtigoResource {

    private final Logger log = LoggerFactory.getLogger(ArtigoResource.class);

    private static final String ENTITY_NAME = "artigo";

    private final ArtigoService artigoService;
    private final AlunoService alunoService;

    public ArtigoResource(ArtigoService artigoService, AlunoService alunoService) {
        this.artigoService = artigoService;
        this.alunoService = alunoService;
    }

    /**
     * POST  /artigos : Create a new artigo.
     *
     * @param artigoDTO the artigoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new artigoDTO, or with status 400 (Bad Request) if the artigo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/artigos")
    @Timed
    public ResponseEntity<ArtigoDTO> createArtigo(@Valid @RequestBody ArtigoDTO artigoDTO) throws URISyntaxException {
        log.debug("REST request to save Artigo : {}", artigoDTO);
        if (artigoDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new artigo cannot already have an ID")).body(null);
        }
        AlunoDTO alunoDTO = alunoService.findByUserId(artigoDTO.getUserId());
        artigoDTO.setAlunoId(alunoDTO.getId());
        ArtigoDTO result = artigoService.save(artigoDTO);
        return ResponseEntity.created(new URI("/api/artigos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /artigos : Updates an existing artigo.
     *
     * @param artigoDTO the artigoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated artigoDTO,
     * or with status 400 (Bad Request) if the artigoDTO is not valid,
     * or with status 500 (Internal Server Error) if the artigoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/artigos")
    @Timed
    public ResponseEntity<ArtigoDTO> updateArtigo(@Valid @RequestBody ArtigoDTO artigoDTO) throws URISyntaxException {
        log.debug("REST request to update Artigo : {}", artigoDTO);
        if (artigoDTO.getId() == null) {
            return createArtigo(artigoDTO);
        }
        ArtigoDTO result = artigoService.save(artigoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, artigoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /artigos : get all the artigos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of artigos in body
     */
    @GetMapping("/artigos")
    @Timed
    public ResponseEntity<List<ArtigoDTO>> getAllArtigos(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Artigos");
        Page<ArtigoDTO> page = artigoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/artigos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/artigos/user/{userId}")
    @Timed
    public ResponseEntity<List<ArtigoDTO>> getAllArtigosByUserId(@PathVariable Long userId, @ApiParam Pageable pageable) {
        Page<ArtigoDTO> page = artigoService.findAllByUserId(userId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/artigos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /artigos/:id : get the "id" artigo.
     *
     * @param id the id of the artigoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the artigoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/artigos/{id}")
    @Timed
    public ResponseEntity<ArtigoDTO> getArtigo(@PathVariable Long id) {
        log.debug("REST request to get Artigo : {}", id);
        ArtigoDTO artigoDTO = artigoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(artigoDTO));
    }

    /**
     * DELETE  /artigos/:id : delete the "id" artigo.
     *
     * @param id the id of the artigoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/artigos/{id}")
    @Timed
    public ResponseEntity<Void> deleteArtigo(@PathVariable Long id) {
        log.debug("REST request to delete Artigo : {}", id);
        artigoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
