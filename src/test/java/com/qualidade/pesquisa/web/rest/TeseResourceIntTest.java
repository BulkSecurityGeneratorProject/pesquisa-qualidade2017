package com.qualidade.pesquisa.web.rest;

import com.qualidade.pesquisa.JhipsterApp;

import com.qualidade.pesquisa.domain.Tese;
import com.qualidade.pesquisa.repository.TeseRepository;
import com.qualidade.pesquisa.service.TeseService;
import com.qualidade.pesquisa.service.AlunoService;
import com.qualidade.pesquisa.service.dto.TeseDTO;
import com.qualidade.pesquisa.service.mapper.TeseMapper;
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
 * Test class for the TeseResource REST controller.
 *
 * @see TeseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class TeseResourceIntTest {

    private static final Double DEFAULT_NOTA = 1D;
    private static final Double UPDATED_NOTA = 2D;

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    @Autowired
    private TeseRepository teseRepository;

    @Autowired
    private TeseMapper teseMapper;

    @Autowired
    private TeseService teseService;

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTeseMockMvc;

    private Tese tese;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeseResource teseResource = new TeseResource(teseService, alunoService);
        this.restTeseMockMvc = MockMvcBuilders.standaloneSetup(teseResource)
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
    public static Tese createEntity(EntityManager em) {
        Tese tese = new Tese()
            .nota(DEFAULT_NOTA)
            .link(DEFAULT_LINK);
        return tese;
    }

    @Before
    public void initTest() {
        tese = createEntity(em);
    }

    @Test
    @Transactional
    public void createTese() throws Exception {
        int databaseSizeBeforeCreate = teseRepository.findAll().size();

        // Create the Tese
        TeseDTO teseDTO = teseMapper.toDto(tese);
        restTeseMockMvc.perform(post("/api/tese")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teseDTO)))
            .andExpect(status().isCreated());

        // Validate the Tese in the database
        List<Tese> teseList = teseRepository.findAll();
        assertThat(teseList).hasSize(databaseSizeBeforeCreate + 1);
        Tese testTese = teseList.get(teseList.size() - 1);
        assertThat(testTese.getNota()).isEqualTo(DEFAULT_NOTA);
        assertThat(testTese.getLink()).isEqualTo(DEFAULT_LINK);
    }

    @Test
    @Transactional
    public void createTeseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teseRepository.findAll().size();

        // Create the Tese with an existing ID
        tese.setId(1L);
        TeseDTO teseDTO = teseMapper.toDto(tese);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeseMockMvc.perform(post("/api/tese")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Tese in the database
        List<Tese> teseList = teseRepository.findAll();
        assertThat(teseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTese() throws Exception {
        // Initialize the database
        teseRepository.saveAndFlush(tese);

        // Get all the teseList
        restTeseMockMvc.perform(get("/api/tese?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tese.getId().intValue())))
            .andExpect(jsonPath("$.[*].nota").value(hasItem(DEFAULT_NOTA.doubleValue())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())));
    }

    @Test
    @Transactional
    public void getTese() throws Exception {
        // Initialize the database
        teseRepository.saveAndFlush(tese);

        // Get the tese
        restTeseMockMvc.perform(get("/api/tese/{id}", tese.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tese.getId().intValue()))
            .andExpect(jsonPath("$.nota").value(DEFAULT_NOTA.doubleValue()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTese() throws Exception {
        // Get the tese
        restTeseMockMvc.perform(get("/api/tese/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTese() throws Exception {
        // Initialize the database
        teseRepository.saveAndFlush(tese);
        int databaseSizeBeforeUpdate = teseRepository.findAll().size();

        // Update the tese
        Tese updatedTese = teseRepository.findOne(tese.getId());
        updatedTese
            .nota(UPDATED_NOTA)
            .link(UPDATED_LINK);
        TeseDTO teseDTO = teseMapper.toDto(updatedTese);

        restTeseMockMvc.perform(put("/api/tese")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teseDTO)))
            .andExpect(status().isOk());

        // Validate the Tese in the database
        List<Tese> teseList = teseRepository.findAll();
        assertThat(teseList).hasSize(databaseSizeBeforeUpdate);
        Tese testTese = teseList.get(teseList.size() - 1);
        assertThat(testTese.getNota()).isEqualTo(UPDATED_NOTA);
        assertThat(testTese.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingTese() throws Exception {
        int databaseSizeBeforeUpdate = teseRepository.findAll().size();

        // Create the Tese
        TeseDTO teseDTO = teseMapper.toDto(tese);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTeseMockMvc.perform(put("/api/tese")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teseDTO)))
            .andExpect(status().isCreated());

        // Validate the Tese in the database
        List<Tese> teseList = teseRepository.findAll();
        assertThat(teseList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTese() throws Exception {
        // Initialize the database
        teseRepository.saveAndFlush(tese);
        int databaseSizeBeforeDelete = teseRepository.findAll().size();

        // Get the tese
        restTeseMockMvc.perform(delete("/api/tese/{id}", tese.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tese> teseList = teseRepository.findAll();
        assertThat(teseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tese.class);
        Tese tese1 = new Tese();
        tese1.setId(1L);
        Tese tese2 = new Tese();
        tese2.setId(tese1.getId());
        assertThat(tese1).isEqualTo(tese2);
        tese2.setId(2L);
        assertThat(tese1).isNotEqualTo(tese2);
        tese1.setId(null);
        assertThat(tese1).isNotEqualTo(tese2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TeseDTO.class);
        TeseDTO teseDTO1 = new TeseDTO();
        teseDTO1.setId(1L);
        TeseDTO teseDTO2 = new TeseDTO();
        assertThat(teseDTO1).isNotEqualTo(teseDTO2);
        teseDTO2.setId(teseDTO1.getId());
        assertThat(teseDTO1).isEqualTo(teseDTO2);
        teseDTO2.setId(2L);
        assertThat(teseDTO1).isNotEqualTo(teseDTO2);
        teseDTO1.setId(null);
        assertThat(teseDTO1).isNotEqualTo(teseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(teseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(teseMapper.fromId(null)).isNull();
    }
}
