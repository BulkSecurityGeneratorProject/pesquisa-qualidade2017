package com.qualidade.pesquisa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.qualidade.pesquisa.service.PropostaTeseService;
import com.qualidade.pesquisa.service.AlunoService;
import com.qualidade.pesquisa.web.rest.util.HeaderUtil;
import com.qualidade.pesquisa.web.rest.util.PaginationUtil;
import com.qualidade.pesquisa.service.dto.PropostaTeseDTO;
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
 * REST controller for managing PropostaTese.
 */
@RestController
@RequestMapping("/api")
public class PropostaTeseResource {

    private final Logger log = LoggerFactory.getLogger(PropostaTeseResource.class);

    private static final String ENTITY_NAME = "propostaTese";

    private final PropostaTeseService propostaTeseService;
    private final AlunoService alunoService;

    public PropostaTeseResource(PropostaTeseService propostaTeseService, AlunoService alunoService) {
        this.propostaTeseService = propostaTeseService;
        this.alunoService = alunoService;
    }

    /**
     * POST  /proposta-tese : Create a new propostaTese.
     *
     * @param propostaTeseDTO the propostaTeseDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new propostaTeseDTO, or with status 400 (Bad Request) if the propostaTese has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/proposta-tese")
    @Timed
    public ResponseEntity<PropostaTeseDTO> createPropostaTese(@Valid @RequestBody PropostaTeseDTO propostaTeseDTO) throws URISyntaxException {
        log.debug("REST request to save PropostaTese : {}", propostaTeseDTO);
        if (propostaTeseDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new propostaTese cannot already have an ID")).body(null);
        }
        AlunoDTO alunoDTO = alunoService.findByUserId(propostaTeseDTO.getUserId());
        propostaTeseDTO.setAlunoId(alunoDTO.getId());
        PropostaTeseDTO result = propostaTeseService.save(propostaTeseDTO);
        return ResponseEntity.created(new URI("/api/proposta-tese/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /proposta-tese : Updates an existing propostaTese.
     *
     * @param propostaTeseDTO the propostaTeseDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated propostaTeseDTO,
     * or with status 400 (Bad Request) if the propostaTeseDTO is not valid,
     * or with status 500 (Internal Server Error) if the propostaTeseDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/proposta-tese")
    @Timed
    public ResponseEntity<PropostaTeseDTO> updatePropostaTese(@Valid @RequestBody PropostaTeseDTO propostaTeseDTO) throws URISyntaxException {
        log.debug("REST request to update PropostaTese : {}", propostaTeseDTO);
        if (propostaTeseDTO.getId() == null) {
            return createPropostaTese(propostaTeseDTO);
        }
        PropostaTeseDTO result = propostaTeseService.save(propostaTeseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, propostaTeseDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /proposta-tese : get all the propostaTese.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of propostaTese in body
     */
    @GetMapping("/proposta-tese")
    @Timed
    public ResponseEntity<List<PropostaTeseDTO>> getAllPropostaTese(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of PropostaTese");
        Page<PropostaTeseDTO> page = propostaTeseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/proposta-tese");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /proposta-tese/:id : get the "id" propostaTese.
     *
     * @param id the id of the propostaTeseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the propostaTeseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/proposta-tese/{id}")
    @Timed
    public ResponseEntity<PropostaTeseDTO> getPropostaTese(@PathVariable Long id) {
        log.debug("REST request to get PropostaTese : {}", id);
        PropostaTeseDTO propostaTeseDTO = propostaTeseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(propostaTeseDTO));
    }


    @GetMapping("/proposta-tese/aluno/{idUser}")
    @Timed
    public ResponseEntity<List<PropostaTeseDTO>> getAllTeseAluno(@PathVariable Long idUser,@ApiParam Pageable pageable) {
        Page<PropostaTeseDTO> page = propostaTeseService.findAllAlunoByUserId(idUser, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tese");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/proposta-tese/professor/{idUser}")
    @Timed
    public ResponseEntity<List<PropostaTeseDTO>> getAllTeseProfessor(@PathVariable Long idUser,@ApiParam Pageable pageable) {
        Page<PropostaTeseDTO> page = propostaTeseService.findAllProfessorByUserId(idUser, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tese");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    /**
     * DELETE  /proposta-tese/:id : delete the "id" propostaTese.
     *
     * @param id the id of the propostaTeseDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/proposta-tese/{id}")
    @Timed
    public ResponseEntity<Void> deletePropostaTese(@PathVariable Long id) {
        log.debug("REST request to delete PropostaTese : {}", id);
        propostaTeseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
