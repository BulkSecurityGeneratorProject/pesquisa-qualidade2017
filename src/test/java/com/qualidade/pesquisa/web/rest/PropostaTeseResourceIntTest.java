package com.qualidade.pesquisa.web.rest;

import com.qualidade.pesquisa.JhipsterApp;

import com.qualidade.pesquisa.domain.PropostaTese;
import com.qualidade.pesquisa.repository.PropostaTeseRepository;
import com.qualidade.pesquisa.service.PropostaTeseService;
import com.qualidade.pesquisa.service.AlunoService;
import com.qualidade.pesquisa.service.dto.PropostaTeseDTO;
import com.qualidade.pesquisa.service.mapper.PropostaTeseMapper;
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
 * Test class for the PropostaTeseResource REST controller.
 *
 * @see PropostaTeseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class PropostaTeseResourceIntTest {

    private static final String DEFAULT_TEMA = "AAAAAAAAAA";
    private static final String UPDATED_TEMA = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_FLGAPROVADO = false;
    private static final Boolean UPDATED_FLGAPROVADO = true;

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    @Autowired
    private PropostaTeseRepository propostaTeseRepository;

    @Autowired
    private PropostaTeseMapper propostaTeseMapper;

    @Autowired
    private PropostaTeseService propostaTeseService;

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

    private MockMvc restPropostaTeseMockMvc;

    private PropostaTese propostaTese;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PropostaTeseResource propostaTeseResource = new PropostaTeseResource(propostaTeseService, alunoService);
        this.restPropostaTeseMockMvc = MockMvcBuilders.standaloneSetup(propostaTeseResource)
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
    public static PropostaTese createEntity(EntityManager em) {
        PropostaTese propostaTese = new PropostaTese()
            .tema(DEFAULT_TEMA)
            .descricao(DEFAULT_DESCRICAO)
            .flgaprovado(DEFAULT_FLGAPROVADO)
            .link(DEFAULT_LINK);
        return propostaTese;
    }

    @Before
    public void initTest() {
        propostaTese = createEntity(em);
    }

    @Test
    @Transactional
    public void createPropostaTese() throws Exception {
        int databaseSizeBeforeCreate = propostaTeseRepository.findAll().size();

        // Create the PropostaTese
        PropostaTeseDTO propostaTeseDTO = propostaTeseMapper.toDto(propostaTese);
        restPropostaTeseMockMvc.perform(post("/api/proposta-tese")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propostaTeseDTO)))
            .andExpect(status().isCreated());

        // Validate the PropostaTese in the database
        List<PropostaTese> propostaTeseList = propostaTeseRepository.findAll();
        assertThat(propostaTeseList).hasSize(databaseSizeBeforeCreate + 1);
        PropostaTese testPropostaTese = propostaTeseList.get(propostaTeseList.size() - 1);
        assertThat(testPropostaTese.getTema()).isEqualTo(DEFAULT_TEMA);
        assertThat(testPropostaTese.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testPropostaTese.isFlgaprovado()).isEqualTo(DEFAULT_FLGAPROVADO);
        assertThat(testPropostaTese.getLink()).isEqualTo(DEFAULT_LINK);
    }

    @Test
    @Transactional
    public void createPropostaTeseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = propostaTeseRepository.findAll().size();

        // Create the PropostaTese with an existing ID
        propostaTese.setId(1L);
        PropostaTeseDTO propostaTeseDTO = propostaTeseMapper.toDto(propostaTese);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPropostaTeseMockMvc.perform(post("/api/proposta-tese")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propostaTeseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PropostaTese in the database
        List<PropostaTese> propostaTeseList = propostaTeseRepository.findAll();
        assertThat(propostaTeseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTemaIsRequired() throws Exception {
        int databaseSizeBeforeTest = propostaTeseRepository.findAll().size();
        // set the field null
        propostaTese.setTema(null);

        // Create the PropostaTese, which fails.
        PropostaTeseDTO propostaTeseDTO = propostaTeseMapper.toDto(propostaTese);

        restPropostaTeseMockMvc.perform(post("/api/proposta-tese")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propostaTeseDTO)))
            .andExpect(status().isBadRequest());

        List<PropostaTese> propostaTeseList = propostaTeseRepository.findAll();
        assertThat(propostaTeseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPropostaTese() throws Exception {
        // Initialize the database
        propostaTeseRepository.saveAndFlush(propostaTese);

        // Get all the propostaTeseList
        restPropostaTeseMockMvc.perform(get("/api/proposta-tese?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(propostaTese.getId().intValue())))
            .andExpect(jsonPath("$.[*].tema").value(hasItem(DEFAULT_TEMA.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].flgaprovado").value(hasItem(DEFAULT_FLGAPROVADO.booleanValue())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())));
    }

    @Test
    @Transactional
    public void getPropostaTese() throws Exception {
        // Initialize the database
        propostaTeseRepository.saveAndFlush(propostaTese);

        // Get the propostaTese
        restPropostaTeseMockMvc.perform(get("/api/proposta-tese/{id}", propostaTese.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(propostaTese.getId().intValue()))
            .andExpect(jsonPath("$.tema").value(DEFAULT_TEMA.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.flgaprovado").value(DEFAULT_FLGAPROVADO.booleanValue()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPropostaTese() throws Exception {
        // Get the propostaTese
        restPropostaTeseMockMvc.perform(get("/api/proposta-tese/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePropostaTese() throws Exception {
        // Initialize the database
        propostaTeseRepository.saveAndFlush(propostaTese);
        int databaseSizeBeforeUpdate = propostaTeseRepository.findAll().size();

        // Update the propostaTese
        PropostaTese updatedPropostaTese = propostaTeseRepository.findOne(propostaTese.getId());
        updatedPropostaTese
            .tema(UPDATED_TEMA)
            .descricao(UPDATED_DESCRICAO)
            .flgaprovado(UPDATED_FLGAPROVADO)
            .link(UPDATED_LINK);
        PropostaTeseDTO propostaTeseDTO = propostaTeseMapper.toDto(updatedPropostaTese);

        restPropostaTeseMockMvc.perform(put("/api/proposta-tese")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propostaTeseDTO)))
            .andExpect(status().isOk());

        // Validate the PropostaTese in the database
        List<PropostaTese> propostaTeseList = propostaTeseRepository.findAll();
        assertThat(propostaTeseList).hasSize(databaseSizeBeforeUpdate);
        PropostaTese testPropostaTese = propostaTeseList.get(propostaTeseList.size() - 1);
        assertThat(testPropostaTese.getTema()).isEqualTo(UPDATED_TEMA);
        assertThat(testPropostaTese.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testPropostaTese.isFlgaprovado()).isEqualTo(UPDATED_FLGAPROVADO);
        assertThat(testPropostaTese.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingPropostaTese() throws Exception {
        int databaseSizeBeforeUpdate = propostaTeseRepository.findAll().size();

        // Create the PropostaTese
        PropostaTeseDTO propostaTeseDTO = propostaTeseMapper.toDto(propostaTese);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPropostaTeseMockMvc.perform(put("/api/proposta-tese")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propostaTeseDTO)))
            .andExpect(status().isCreated());

        // Validate the PropostaTese in the database
        List<PropostaTese> propostaTeseList = propostaTeseRepository.findAll();
        assertThat(propostaTeseList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePropostaTese() throws Exception {
        // Initialize the database
        propostaTeseRepository.saveAndFlush(propostaTese);
        int databaseSizeBeforeDelete = propostaTeseRepository.findAll().size();

        // Get the propostaTese
        restPropostaTeseMockMvc.perform(delete("/api/proposta-tese/{id}", propostaTese.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PropostaTese> propostaTeseList = propostaTeseRepository.findAll();
        assertThat(propostaTeseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PropostaTese.class);
        PropostaTese propostaTese1 = new PropostaTese();
        propostaTese1.setId(1L);
        PropostaTese propostaTese2 = new PropostaTese();
        propostaTese2.setId(propostaTese1.getId());
        assertThat(propostaTese1).isEqualTo(propostaTese2);
        propostaTese2.setId(2L);
        assertThat(propostaTese1).isNotEqualTo(propostaTese2);
        propostaTese1.setId(null);
        assertThat(propostaTese1).isNotEqualTo(propostaTese2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PropostaTeseDTO.class);
        PropostaTeseDTO propostaTeseDTO1 = new PropostaTeseDTO();
        propostaTeseDTO1.setId(1L);
        PropostaTeseDTO propostaTeseDTO2 = new PropostaTeseDTO();
        assertThat(propostaTeseDTO1).isNotEqualTo(propostaTeseDTO2);
        propostaTeseDTO2.setId(propostaTeseDTO1.getId());
        assertThat(propostaTeseDTO1).isEqualTo(propostaTeseDTO2);
        propostaTeseDTO2.setId(2L);
        assertThat(propostaTeseDTO1).isNotEqualTo(propostaTeseDTO2);
        propostaTeseDTO1.setId(null);
        assertThat(propostaTeseDTO1).isNotEqualTo(propostaTeseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(propostaTeseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(propostaTeseMapper.fromId(null)).isNull();
    }
}
