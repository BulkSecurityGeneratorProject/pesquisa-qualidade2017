package com.qualidade.pesquisa.web.rest;

import com.qualidade.pesquisa.JhipsterApp;

import com.qualidade.pesquisa.domain.CoOrientador;
import com.qualidade.pesquisa.repository.CoOrientadorRepository;
import com.qualidade.pesquisa.service.CoOrientadorService;
import com.qualidade.pesquisa.service.dto.CoOrientadorDTO;
import com.qualidade.pesquisa.service.mapper.CoOrientadorMapper;
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
 * Test class for the CoOrientadorResource REST controller.
 *
 * @see CoOrientadorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class CoOrientadorResourceIntTest {

    @Autowired
    private CoOrientadorRepository coOrientadorRepository;

    @Autowired
    private CoOrientadorMapper coOrientadorMapper;

    @Autowired
    private CoOrientadorService coOrientadorService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCoOrientadorMockMvc;

    private CoOrientador coOrientador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CoOrientadorResource coOrientadorResource = new CoOrientadorResource(coOrientadorService);
        this.restCoOrientadorMockMvc = MockMvcBuilders.standaloneSetup(coOrientadorResource)
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
    public static CoOrientador createEntity(EntityManager em) {
        CoOrientador coOrientador = new CoOrientador();
        return coOrientador;
    }

    @Before
    public void initTest() {
        coOrientador = createEntity(em);
    }

    @Test
    @Transactional
    public void createCoOrientador() throws Exception {
        int databaseSizeBeforeCreate = coOrientadorRepository.findAll().size();

        // Create the CoOrientador
        CoOrientadorDTO coOrientadorDTO = coOrientadorMapper.toDto(coOrientador);
        restCoOrientadorMockMvc.perform(post("/api/co-orientadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coOrientadorDTO)))
            .andExpect(status().isCreated());

        // Validate the CoOrientador in the database
        List<CoOrientador> coOrientadorList = coOrientadorRepository.findAll();
        assertThat(coOrientadorList).hasSize(databaseSizeBeforeCreate + 1);
        CoOrientador testCoOrientador = coOrientadorList.get(coOrientadorList.size() - 1);
    }

    @Test
    @Transactional
    public void createCoOrientadorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = coOrientadorRepository.findAll().size();

        // Create the CoOrientador with an existing ID
        coOrientador.setId(1L);
        CoOrientadorDTO coOrientadorDTO = coOrientadorMapper.toDto(coOrientador);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCoOrientadorMockMvc.perform(post("/api/co-orientadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coOrientadorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CoOrientador in the database
        List<CoOrientador> coOrientadorList = coOrientadorRepository.findAll();
        assertThat(coOrientadorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCoOrientadors() throws Exception {
        // Initialize the database
        coOrientadorRepository.saveAndFlush(coOrientador);

        // Get all the coOrientadorList
        restCoOrientadorMockMvc.perform(get("/api/co-orientadors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coOrientador.getId().intValue())));
    }

    @Test
    @Transactional
    public void getCoOrientador() throws Exception {
        // Initialize the database
        coOrientadorRepository.saveAndFlush(coOrientador);

        // Get the coOrientador
        restCoOrientadorMockMvc.perform(get("/api/co-orientadors/{id}", coOrientador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(coOrientador.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCoOrientador() throws Exception {
        // Get the coOrientador
        restCoOrientadorMockMvc.perform(get("/api/co-orientadors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCoOrientador() throws Exception {
        // Initialize the database
        coOrientadorRepository.saveAndFlush(coOrientador);
        int databaseSizeBeforeUpdate = coOrientadorRepository.findAll().size();

        // Update the coOrientador
        CoOrientador updatedCoOrientador = coOrientadorRepository.findOne(coOrientador.getId());
        CoOrientadorDTO coOrientadorDTO = coOrientadorMapper.toDto(updatedCoOrientador);

        restCoOrientadorMockMvc.perform(put("/api/co-orientadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coOrientadorDTO)))
            .andExpect(status().isOk());

        // Validate the CoOrientador in the database
        List<CoOrientador> coOrientadorList = coOrientadorRepository.findAll();
        assertThat(coOrientadorList).hasSize(databaseSizeBeforeUpdate);
        CoOrientador testCoOrientador = coOrientadorList.get(coOrientadorList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCoOrientador() throws Exception {
        int databaseSizeBeforeUpdate = coOrientadorRepository.findAll().size();

        // Create the CoOrientador
        CoOrientadorDTO coOrientadorDTO = coOrientadorMapper.toDto(coOrientador);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCoOrientadorMockMvc.perform(put("/api/co-orientadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coOrientadorDTO)))
            .andExpect(status().isCreated());

        // Validate the CoOrientador in the database
        List<CoOrientador> coOrientadorList = coOrientadorRepository.findAll();
        assertThat(coOrientadorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCoOrientador() throws Exception {
        // Initialize the database
        coOrientadorRepository.saveAndFlush(coOrientador);
        int databaseSizeBeforeDelete = coOrientadorRepository.findAll().size();

        // Get the coOrientador
        restCoOrientadorMockMvc.perform(delete("/api/co-orientadors/{id}", coOrientador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CoOrientador> coOrientadorList = coOrientadorRepository.findAll();
        assertThat(coOrientadorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CoOrientador.class);
        CoOrientador coOrientador1 = new CoOrientador();
        coOrientador1.setId(1L);
        CoOrientador coOrientador2 = new CoOrientador();
        coOrientador2.setId(coOrientador1.getId());
        assertThat(coOrientador1).isEqualTo(coOrientador2);
        coOrientador2.setId(2L);
        assertThat(coOrientador1).isNotEqualTo(coOrientador2);
        coOrientador1.setId(null);
        assertThat(coOrientador1).isNotEqualTo(coOrientador2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CoOrientadorDTO.class);
        CoOrientadorDTO coOrientadorDTO1 = new CoOrientadorDTO();
        coOrientadorDTO1.setId(1L);
        CoOrientadorDTO coOrientadorDTO2 = new CoOrientadorDTO();
        assertThat(coOrientadorDTO1).isNotEqualTo(coOrientadorDTO2);
        coOrientadorDTO2.setId(coOrientadorDTO1.getId());
        assertThat(coOrientadorDTO1).isEqualTo(coOrientadorDTO2);
        coOrientadorDTO2.setId(2L);
        assertThat(coOrientadorDTO1).isNotEqualTo(coOrientadorDTO2);
        coOrientadorDTO1.setId(null);
        assertThat(coOrientadorDTO1).isNotEqualTo(coOrientadorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(coOrientadorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(coOrientadorMapper.fromId(null)).isNull();
    }
}
