package com.qualidade.pesquisa.web.rest;

import com.qualidade.pesquisa.JhipsterApp;

import com.qualidade.pesquisa.domain.ProfessorBanca;
import com.qualidade.pesquisa.repository.ProfessorBancaRepository;
import com.qualidade.pesquisa.service.ProfessorBancaService;
import com.qualidade.pesquisa.service.dto.ProfessorBancaDTO;
import com.qualidade.pesquisa.service.mapper.ProfessorBancaMapper;
import com.qualidade.pesquisa.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProfessorBancaResource REST controller.
 *
 * @see ProfessorBancaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class ProfessorBancaResourceIntTest {

    private static final Double DEFAULT_NOTA = 1D;
    private static final Double UPDATED_NOTA = 2D;

    private static final Boolean DEFAULT_INVITE = false;
    private static final Boolean UPDATED_INVITE = true;

    @Autowired
    private ProfessorBancaRepository professorBancaRepository;

    @Autowired
    private ProfessorBancaMapper professorBancaMapper;

    @Autowired
    private ProfessorBancaService professorBancaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProfessorBancaMockMvc;

    private ProfessorBanca professorBanca;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfessorBancaResource professorBancaResource = new ProfessorBancaResource(professorBancaService);
        this.restProfessorBancaMockMvc = MockMvcBuilders.standaloneSetup(professorBancaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfessorBanca createEntity(EntityManager em) {
        ProfessorBanca professorBanca = new ProfessorBanca()
            .nota(DEFAULT_NOTA)
            .invite(DEFAULT_INVITE);
        return professorBanca;
    }

    @Before
    public void initTest() {
        professorBanca = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfessorBanca() throws Exception {
        int databaseSizeBeforeCreate = professorBancaRepository.findAll().size();

        // Create the ProfessorBanca
        ProfessorBancaDTO professorBancaDTO = professorBancaMapper.toDto(professorBanca);
        restProfessorBancaMockMvc.perform(post("/api/professor-bancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professorBancaDTO)))
            .andExpect(status().isCreated());

        // Validate the ProfessorBanca in the database
        List<ProfessorBanca> professorBancaList = professorBancaRepository.findAll();
        assertThat(professorBancaList).hasSize(databaseSizeBeforeCreate + 1);
        ProfessorBanca testProfessorBanca = professorBancaList.get(professorBancaList.size() - 1);
        assertThat(testProfessorBanca.getNota()).isEqualTo(DEFAULT_NOTA);
        assertThat(testProfessorBanca.isInvite()).isEqualTo(DEFAULT_INVITE);
    }

    @Test
    @Transactional
    public void createProfessorBancaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = professorBancaRepository.findAll().size();

        // Create the ProfessorBanca with an existing ID
        professorBanca.setId(1L);
        ProfessorBancaDTO professorBancaDTO = professorBancaMapper.toDto(professorBanca);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfessorBancaMockMvc.perform(post("/api/professor-bancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professorBancaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProfessorBanca in the database
        List<ProfessorBanca> professorBancaList = professorBancaRepository.findAll();
        assertThat(professorBancaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProfessorBancas() throws Exception {
        // Initialize the database
        professorBancaRepository.saveAndFlush(professorBanca);

        // Get all the professorBancaList
        restProfessorBancaMockMvc.perform(get("/api/professor-bancas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(professorBanca.getId().intValue())))
            .andExpect(jsonPath("$.[*].nota").value(hasItem(DEFAULT_NOTA.doubleValue())))
            .andExpect(jsonPath("$.[*].invite").value(hasItem(DEFAULT_INVITE.booleanValue())));
    }

    @Test
    @Transactional
    public void getProfessorBanca() throws Exception {
        // Initialize the database
        professorBancaRepository.saveAndFlush(professorBanca);

        // Get the professorBanca
        restProfessorBancaMockMvc.perform(get("/api/professor-bancas/{id}", professorBanca.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(professorBanca.getId().intValue()))
            .andExpect(jsonPath("$.nota").value(DEFAULT_NOTA.doubleValue()))
            .andExpect(jsonPath("$.invite").value(DEFAULT_INVITE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProfessorBanca() throws Exception {
        // Get the professorBanca
        restProfessorBancaMockMvc.perform(get("/api/professor-bancas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfessorBanca() throws Exception {
        // Initialize the database
        professorBancaRepository.saveAndFlush(professorBanca);
        int databaseSizeBeforeUpdate = professorBancaRepository.findAll().size();

        // Update the professorBanca
        ProfessorBanca updatedProfessorBanca = professorBancaRepository.findOne(professorBanca.getId());
        updatedProfessorBanca
            .nota(UPDATED_NOTA)
            .invite(UPDATED_INVITE);
        ProfessorBancaDTO professorBancaDTO = professorBancaMapper.toDto(updatedProfessorBanca);

        restProfessorBancaMockMvc.perform(put("/api/professor-bancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professorBancaDTO)))
            .andExpect(status().isOk());

        // Validate the ProfessorBanca in the database
        List<ProfessorBanca> professorBancaList = professorBancaRepository.findAll();
        assertThat(professorBancaList).hasSize(databaseSizeBeforeUpdate);
        ProfessorBanca testProfessorBanca = professorBancaList.get(professorBancaList.size() - 1);
        assertThat(testProfessorBanca.getNota()).isEqualTo(UPDATED_NOTA);
        assertThat(testProfessorBanca.isInvite()).isEqualTo(UPDATED_INVITE);
    }

    @Test
    @Transactional
    public void updateNonExistingProfessorBanca() throws Exception {
        int databaseSizeBeforeUpdate = professorBancaRepository.findAll().size();

        // Create the ProfessorBanca
        ProfessorBancaDTO professorBancaDTO = professorBancaMapper.toDto(professorBanca);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProfessorBancaMockMvc.perform(put("/api/professor-bancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professorBancaDTO)))
            .andExpect(status().isCreated());

        // Validate the ProfessorBanca in the database
        List<ProfessorBanca> professorBancaList = professorBancaRepository.findAll();
        assertThat(professorBancaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProfessorBanca() throws Exception {
        // Initialize the database
        professorBancaRepository.saveAndFlush(professorBanca);
        int databaseSizeBeforeDelete = professorBancaRepository.findAll().size();

        // Get the professorBanca
        restProfessorBancaMockMvc.perform(delete("/api/professor-bancas/{id}", professorBanca.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProfessorBanca> professorBancaList = professorBancaRepository.findAll();
        assertThat(professorBancaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfessorBanca.class);
        ProfessorBanca professorBanca1 = new ProfessorBanca();
        professorBanca1.setId(1L);
        ProfessorBanca professorBanca2 = new ProfessorBanca();
        professorBanca2.setId(professorBanca1.getId());
        assertThat(professorBanca1).isEqualTo(professorBanca2);
        professorBanca2.setId(2L);
        assertThat(professorBanca1).isNotEqualTo(professorBanca2);
        professorBanca1.setId(null);
        assertThat(professorBanca1).isNotEqualTo(professorBanca2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfessorBancaDTO.class);
        ProfessorBancaDTO professorBancaDTO1 = new ProfessorBancaDTO();
        professorBancaDTO1.setId(1L);
        ProfessorBancaDTO professorBancaDTO2 = new ProfessorBancaDTO();
        assertThat(professorBancaDTO1).isNotEqualTo(professorBancaDTO2);
        professorBancaDTO2.setId(professorBancaDTO1.getId());
        assertThat(professorBancaDTO1).isEqualTo(professorBancaDTO2);
        professorBancaDTO2.setId(2L);
        assertThat(professorBancaDTO1).isNotEqualTo(professorBancaDTO2);
        professorBancaDTO1.setId(null);
        assertThat(professorBancaDTO1).isNotEqualTo(professorBancaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(professorBancaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(professorBancaMapper.fromId(null)).isNull();
    }
}
