package com.qualidade.pesquisa.web.rest;

import com.qualidade.pesquisa.JhipsterApp;

import com.qualidade.pesquisa.domain.Banca;
import com.qualidade.pesquisa.repository.BancaRepository;
import com.qualidade.pesquisa.service.BancaService;
import com.qualidade.pesquisa.service.dto.BancaDTO;
import com.qualidade.pesquisa.service.mapper.BancaMapper;
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
 * Test class for the BancaResource REST controller.
 *
 * @see BancaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class BancaResourceIntTest {

    private static final Boolean DEFAULT_FLGAPROVADASECRETARIA = false;
    private static final Boolean UPDATED_FLGAPROVADASECRETARIA = true;

    @Autowired
    private BancaRepository bancaRepository;

    @Autowired
    private BancaMapper bancaMapper;

    @Autowired
    private BancaService bancaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBancaMockMvc;

    private Banca banca;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BancaResource bancaResource = new BancaResource(bancaService);
        this.restBancaMockMvc = MockMvcBuilders.standaloneSetup(bancaResource)
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
    public static Banca createEntity(EntityManager em) {
        Banca banca = new Banca()
            .flgaprovadasecretaria(DEFAULT_FLGAPROVADASECRETARIA);
        return banca;
    }

    @Before
    public void initTest() {
        banca = createEntity(em);
    }

    @Test
    @Transactional
    public void createBanca() throws Exception {
        int databaseSizeBeforeCreate = bancaRepository.findAll().size();

        // Create the Banca
        BancaDTO bancaDTO = bancaMapper.toDto(banca);
        restBancaMockMvc.perform(post("/api/bancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bancaDTO)))
            .andExpect(status().isCreated());

        // Validate the Banca in the database
        List<Banca> bancaList = bancaRepository.findAll();
        assertThat(bancaList).hasSize(databaseSizeBeforeCreate + 1);
        Banca testBanca = bancaList.get(bancaList.size() - 1);
        assertThat(testBanca.isFlgaprovadasecretaria()).isEqualTo(DEFAULT_FLGAPROVADASECRETARIA);
    }

    @Test
    @Transactional
    public void createBancaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bancaRepository.findAll().size();

        // Create the Banca with an existing ID
        banca.setId(1L);
        BancaDTO bancaDTO = bancaMapper.toDto(banca);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBancaMockMvc.perform(post("/api/bancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bancaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Banca in the database
        List<Banca> bancaList = bancaRepository.findAll();
        assertThat(bancaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBancas() throws Exception {
        // Initialize the database
        bancaRepository.saveAndFlush(banca);

        // Get all the bancaList
        restBancaMockMvc.perform(get("/api/bancas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(banca.getId().intValue())))
            .andExpect(jsonPath("$.[*].flgaprovadasecretaria").value(hasItem(DEFAULT_FLGAPROVADASECRETARIA.booleanValue())));
    }

    @Test
    @Transactional
    public void getBanca() throws Exception {
        // Initialize the database
        bancaRepository.saveAndFlush(banca);

        // Get the banca
        restBancaMockMvc.perform(get("/api/bancas/{id}", banca.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(banca.getId().intValue()))
            .andExpect(jsonPath("$.flgaprovadasecretaria").value(DEFAULT_FLGAPROVADASECRETARIA.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBanca() throws Exception {
        // Get the banca
        restBancaMockMvc.perform(get("/api/bancas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBanca() throws Exception {
        // Initialize the database
        bancaRepository.saveAndFlush(banca);
        int databaseSizeBeforeUpdate = bancaRepository.findAll().size();

        // Update the banca
        Banca updatedBanca = bancaRepository.findOne(banca.getId());
        updatedBanca
            .flgaprovadasecretaria(UPDATED_FLGAPROVADASECRETARIA);
        BancaDTO bancaDTO = bancaMapper.toDto(updatedBanca);

        restBancaMockMvc.perform(put("/api/bancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bancaDTO)))
            .andExpect(status().isOk());

        // Validate the Banca in the database
        List<Banca> bancaList = bancaRepository.findAll();
        assertThat(bancaList).hasSize(databaseSizeBeforeUpdate);
        Banca testBanca = bancaList.get(bancaList.size() - 1);
        assertThat(testBanca.isFlgaprovadasecretaria()).isEqualTo(UPDATED_FLGAPROVADASECRETARIA);
    }

    @Test
    @Transactional
    public void updateNonExistingBanca() throws Exception {
        int databaseSizeBeforeUpdate = bancaRepository.findAll().size();

        // Create the Banca
        BancaDTO bancaDTO = bancaMapper.toDto(banca);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBancaMockMvc.perform(put("/api/bancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bancaDTO)))
            .andExpect(status().isCreated());

        // Validate the Banca in the database
        List<Banca> bancaList = bancaRepository.findAll();
        assertThat(bancaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBanca() throws Exception {
        // Initialize the database
        bancaRepository.saveAndFlush(banca);
        int databaseSizeBeforeDelete = bancaRepository.findAll().size();

        // Get the banca
        restBancaMockMvc.perform(delete("/api/bancas/{id}", banca.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Banca> bancaList = bancaRepository.findAll();
        assertThat(bancaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Banca.class);
        Banca banca1 = new Banca();
        banca1.setId(1L);
        Banca banca2 = new Banca();
        banca2.setId(banca1.getId());
        assertThat(banca1).isEqualTo(banca2);
        banca2.setId(2L);
        assertThat(banca1).isNotEqualTo(banca2);
        banca1.setId(null);
        assertThat(banca1).isNotEqualTo(banca2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BancaDTO.class);
        BancaDTO bancaDTO1 = new BancaDTO();
        bancaDTO1.setId(1L);
        BancaDTO bancaDTO2 = new BancaDTO();
        assertThat(bancaDTO1).isNotEqualTo(bancaDTO2);
        bancaDTO2.setId(bancaDTO1.getId());
        assertThat(bancaDTO1).isEqualTo(bancaDTO2);
        bancaDTO2.setId(2L);
        assertThat(bancaDTO1).isNotEqualTo(bancaDTO2);
        bancaDTO1.setId(null);
        assertThat(bancaDTO1).isNotEqualTo(bancaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bancaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bancaMapper.fromId(null)).isNull();
    }
}
