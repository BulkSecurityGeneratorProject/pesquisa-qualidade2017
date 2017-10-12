package com.qualidade.pesquisa.web.rest;

import com.qualidade.pesquisa.JhipsterApp;

import com.qualidade.pesquisa.domain.AreaPesquisa;
import com.qualidade.pesquisa.repository.AreaPesquisaRepository;
import com.qualidade.pesquisa.service.AreaPesquisaService;
import com.qualidade.pesquisa.service.dto.AreaPesquisaDTO;
import com.qualidade.pesquisa.service.mapper.AreaPesquisaMapper;
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
 * Test class for the AreaPesquisaResource REST controller.
 *
 * @see AreaPesquisaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class AreaPesquisaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private AreaPesquisaRepository areaPesquisaRepository;

    @Autowired
    private AreaPesquisaMapper areaPesquisaMapper;

    @Autowired
    private AreaPesquisaService areaPesquisaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAreaPesquisaMockMvc;

    private AreaPesquisa areaPesquisa;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AreaPesquisaResource areaPesquisaResource = new AreaPesquisaResource(areaPesquisaService);
        this.restAreaPesquisaMockMvc = MockMvcBuilders.standaloneSetup(areaPesquisaResource)
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
    public static AreaPesquisa createEntity(EntityManager em) {
        AreaPesquisa areaPesquisa = new AreaPesquisa()
            .nome(DEFAULT_NOME)
            .descricao(DEFAULT_DESCRICAO);
        return areaPesquisa;
    }

    @Before
    public void initTest() {
        areaPesquisa = createEntity(em);
    }

    @Test
    @Transactional
    public void createAreaPesquisa() throws Exception {
        int databaseSizeBeforeCreate = areaPesquisaRepository.findAll().size();

        // Create the AreaPesquisa
        AreaPesquisaDTO areaPesquisaDTO = areaPesquisaMapper.toDto(areaPesquisa);
        restAreaPesquisaMockMvc.perform(post("/api/area-pesquisas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(areaPesquisaDTO)))
            .andExpect(status().isCreated());

        // Validate the AreaPesquisa in the database
        List<AreaPesquisa> areaPesquisaList = areaPesquisaRepository.findAll();
        assertThat(areaPesquisaList).hasSize(databaseSizeBeforeCreate + 1);
        AreaPesquisa testAreaPesquisa = areaPesquisaList.get(areaPesquisaList.size() - 1);
        assertThat(testAreaPesquisa.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testAreaPesquisa.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createAreaPesquisaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = areaPesquisaRepository.findAll().size();

        // Create the AreaPesquisa with an existing ID
        areaPesquisa.setId(1L);
        AreaPesquisaDTO areaPesquisaDTO = areaPesquisaMapper.toDto(areaPesquisa);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAreaPesquisaMockMvc.perform(post("/api/area-pesquisas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(areaPesquisaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AreaPesquisa in the database
        List<AreaPesquisa> areaPesquisaList = areaPesquisaRepository.findAll();
        assertThat(areaPesquisaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAreaPesquisas() throws Exception {
        // Initialize the database
        areaPesquisaRepository.saveAndFlush(areaPesquisa);

        // Get all the areaPesquisaList
        restAreaPesquisaMockMvc.perform(get("/api/area-pesquisas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(areaPesquisa.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }

    @Test
    @Transactional
    public void getAreaPesquisa() throws Exception {
        // Initialize the database
        areaPesquisaRepository.saveAndFlush(areaPesquisa);

        // Get the areaPesquisa
        restAreaPesquisaMockMvc.perform(get("/api/area-pesquisas/{id}", areaPesquisa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(areaPesquisa.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAreaPesquisa() throws Exception {
        // Get the areaPesquisa
        restAreaPesquisaMockMvc.perform(get("/api/area-pesquisas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAreaPesquisa() throws Exception {
        // Initialize the database
        areaPesquisaRepository.saveAndFlush(areaPesquisa);
        int databaseSizeBeforeUpdate = areaPesquisaRepository.findAll().size();

        // Update the areaPesquisa
        AreaPesquisa updatedAreaPesquisa = areaPesquisaRepository.findOne(areaPesquisa.getId());
        updatedAreaPesquisa
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO);
        AreaPesquisaDTO areaPesquisaDTO = areaPesquisaMapper.toDto(updatedAreaPesquisa);

        restAreaPesquisaMockMvc.perform(put("/api/area-pesquisas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(areaPesquisaDTO)))
            .andExpect(status().isOk());

        // Validate the AreaPesquisa in the database
        List<AreaPesquisa> areaPesquisaList = areaPesquisaRepository.findAll();
        assertThat(areaPesquisaList).hasSize(databaseSizeBeforeUpdate);
        AreaPesquisa testAreaPesquisa = areaPesquisaList.get(areaPesquisaList.size() - 1);
        assertThat(testAreaPesquisa.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testAreaPesquisa.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingAreaPesquisa() throws Exception {
        int databaseSizeBeforeUpdate = areaPesquisaRepository.findAll().size();

        // Create the AreaPesquisa
        AreaPesquisaDTO areaPesquisaDTO = areaPesquisaMapper.toDto(areaPesquisa);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAreaPesquisaMockMvc.perform(put("/api/area-pesquisas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(areaPesquisaDTO)))
            .andExpect(status().isCreated());

        // Validate the AreaPesquisa in the database
        List<AreaPesquisa> areaPesquisaList = areaPesquisaRepository.findAll();
        assertThat(areaPesquisaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAreaPesquisa() throws Exception {
        // Initialize the database
        areaPesquisaRepository.saveAndFlush(areaPesquisa);
        int databaseSizeBeforeDelete = areaPesquisaRepository.findAll().size();

        // Get the areaPesquisa
        restAreaPesquisaMockMvc.perform(delete("/api/area-pesquisas/{id}", areaPesquisa.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AreaPesquisa> areaPesquisaList = areaPesquisaRepository.findAll();
        assertThat(areaPesquisaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AreaPesquisa.class);
        AreaPesquisa areaPesquisa1 = new AreaPesquisa();
        areaPesquisa1.setId(1L);
        AreaPesquisa areaPesquisa2 = new AreaPesquisa();
        areaPesquisa2.setId(areaPesquisa1.getId());
        assertThat(areaPesquisa1).isEqualTo(areaPesquisa2);
        areaPesquisa2.setId(2L);
        assertThat(areaPesquisa1).isNotEqualTo(areaPesquisa2);
        areaPesquisa1.setId(null);
        assertThat(areaPesquisa1).isNotEqualTo(areaPesquisa2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AreaPesquisaDTO.class);
        AreaPesquisaDTO areaPesquisaDTO1 = new AreaPesquisaDTO();
        areaPesquisaDTO1.setId(1L);
        AreaPesquisaDTO areaPesquisaDTO2 = new AreaPesquisaDTO();
        assertThat(areaPesquisaDTO1).isNotEqualTo(areaPesquisaDTO2);
        areaPesquisaDTO2.setId(areaPesquisaDTO1.getId());
        assertThat(areaPesquisaDTO1).isEqualTo(areaPesquisaDTO2);
        areaPesquisaDTO2.setId(2L);
        assertThat(areaPesquisaDTO1).isNotEqualTo(areaPesquisaDTO2);
        areaPesquisaDTO1.setId(null);
        assertThat(areaPesquisaDTO1).isNotEqualTo(areaPesquisaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(areaPesquisaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(areaPesquisaMapper.fromId(null)).isNull();
    }
}
