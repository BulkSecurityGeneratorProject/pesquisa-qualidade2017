package com.qualidade.pesquisa.web.rest;

import com.qualidade.pesquisa.JhipsterApp;

import com.qualidade.pesquisa.domain.Apresentacao;
import com.qualidade.pesquisa.repository.ApresentacaoRepository;
import com.qualidade.pesquisa.service.ApresentacaoService;
import com.qualidade.pesquisa.service.dto.ApresentacaoDTO;
import com.qualidade.pesquisa.service.mapper.ApresentacaoMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ApresentacaoResource REST controller.
 *
 * @see ApresentacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class ApresentacaoResourceIntTest {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_FLGAGENDAMENTOAPROVADO = false;
    private static final Boolean UPDATED_FLGAGENDAMENTOAPROVADO = true;

    private static final Boolean DEFAULT_FLGPROPOSTA = false;
    private static final Boolean UPDATED_FLGPROPOSTA = true;

    @Autowired
    private ApresentacaoRepository apresentacaoRepository;

    @Autowired
    private ApresentacaoMapper apresentacaoMapper;

    @Autowired
    private ApresentacaoService apresentacaoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restApresentacaoMockMvc;

    private Apresentacao apresentacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ApresentacaoResource apresentacaoResource = new ApresentacaoResource(apresentacaoService);
        this.restApresentacaoMockMvc = MockMvcBuilders.standaloneSetup(apresentacaoResource)
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
    public static Apresentacao createEntity(EntityManager em) {
        Apresentacao apresentacao = new Apresentacao()
            .data(DEFAULT_DATA)
            .flgagendamentoaprovado(DEFAULT_FLGAGENDAMENTOAPROVADO)
            .flgproposta(DEFAULT_FLGPROPOSTA);
        return apresentacao;
    }

    @Before
    public void initTest() {
        apresentacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createApresentacao() throws Exception {
        int databaseSizeBeforeCreate = apresentacaoRepository.findAll().size();

        // Create the Apresentacao
        ApresentacaoDTO apresentacaoDTO = apresentacaoMapper.toDto(apresentacao);
        restApresentacaoMockMvc.perform(post("/api/apresentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apresentacaoDTO)))
            .andExpect(status().isCreated());

        // Validate the Apresentacao in the database
        List<Apresentacao> apresentacaoList = apresentacaoRepository.findAll();
        assertThat(apresentacaoList).hasSize(databaseSizeBeforeCreate + 1);
        Apresentacao testApresentacao = apresentacaoList.get(apresentacaoList.size() - 1);
        assertThat(testApresentacao.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testApresentacao.isFlgagendamentoaprovado()).isEqualTo(DEFAULT_FLGAGENDAMENTOAPROVADO);
        assertThat(testApresentacao.isFlgproposta()).isEqualTo(DEFAULT_FLGPROPOSTA);
    }

    @Test
    @Transactional
    public void createApresentacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = apresentacaoRepository.findAll().size();

        // Create the Apresentacao with an existing ID
        apresentacao.setId(1L);
        ApresentacaoDTO apresentacaoDTO = apresentacaoMapper.toDto(apresentacao);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApresentacaoMockMvc.perform(post("/api/apresentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apresentacaoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Apresentacao in the database
        List<Apresentacao> apresentacaoList = apresentacaoRepository.findAll();
        assertThat(apresentacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFlgpropostaIsRequired() throws Exception {
        int databaseSizeBeforeTest = apresentacaoRepository.findAll().size();
        // set the field null
        apresentacao.setFlgproposta(null);

        // Create the Apresentacao, which fails.
        ApresentacaoDTO apresentacaoDTO = apresentacaoMapper.toDto(apresentacao);

        restApresentacaoMockMvc.perform(post("/api/apresentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apresentacaoDTO)))
            .andExpect(status().isBadRequest());

        List<Apresentacao> apresentacaoList = apresentacaoRepository.findAll();
        assertThat(apresentacaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllApresentacaos() throws Exception {
        // Initialize the database
        apresentacaoRepository.saveAndFlush(apresentacao);

        // Get all the apresentacaoList
        restApresentacaoMockMvc.perform(get("/api/apresentacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(apresentacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].flgagendamentoaprovado").value(hasItem(DEFAULT_FLGAGENDAMENTOAPROVADO.booleanValue())))
            .andExpect(jsonPath("$.[*].flgproposta").value(hasItem(DEFAULT_FLGPROPOSTA.booleanValue())));
    }

    @Test
    @Transactional
    public void getApresentacao() throws Exception {
        // Initialize the database
        apresentacaoRepository.saveAndFlush(apresentacao);

        // Get the apresentacao
        restApresentacaoMockMvc.perform(get("/api/apresentacaos/{id}", apresentacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(apresentacao.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.flgagendamentoaprovado").value(DEFAULT_FLGAGENDAMENTOAPROVADO.booleanValue()))
            .andExpect(jsonPath("$.flgproposta").value(DEFAULT_FLGPROPOSTA.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingApresentacao() throws Exception {
        // Get the apresentacao
        restApresentacaoMockMvc.perform(get("/api/apresentacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApresentacao() throws Exception {
        // Initialize the database
        apresentacaoRepository.saveAndFlush(apresentacao);
        int databaseSizeBeforeUpdate = apresentacaoRepository.findAll().size();

        // Update the apresentacao
        Apresentacao updatedApresentacao = apresentacaoRepository.findOne(apresentacao.getId());
        updatedApresentacao
            .data(UPDATED_DATA)
            .flgagendamentoaprovado(UPDATED_FLGAGENDAMENTOAPROVADO)
            .flgproposta(UPDATED_FLGPROPOSTA);
        ApresentacaoDTO apresentacaoDTO = apresentacaoMapper.toDto(updatedApresentacao);

        restApresentacaoMockMvc.perform(put("/api/apresentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apresentacaoDTO)))
            .andExpect(status().isOk());

        // Validate the Apresentacao in the database
        List<Apresentacao> apresentacaoList = apresentacaoRepository.findAll();
        assertThat(apresentacaoList).hasSize(databaseSizeBeforeUpdate);
        Apresentacao testApresentacao = apresentacaoList.get(apresentacaoList.size() - 1);
        assertThat(testApresentacao.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testApresentacao.isFlgagendamentoaprovado()).isEqualTo(UPDATED_FLGAGENDAMENTOAPROVADO);
        assertThat(testApresentacao.isFlgproposta()).isEqualTo(UPDATED_FLGPROPOSTA);
    }

    @Test
    @Transactional
    public void updateNonExistingApresentacao() throws Exception {
        int databaseSizeBeforeUpdate = apresentacaoRepository.findAll().size();

        // Create the Apresentacao
        ApresentacaoDTO apresentacaoDTO = apresentacaoMapper.toDto(apresentacao);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restApresentacaoMockMvc.perform(put("/api/apresentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apresentacaoDTO)))
            .andExpect(status().isCreated());

        // Validate the Apresentacao in the database
        List<Apresentacao> apresentacaoList = apresentacaoRepository.findAll();
        assertThat(apresentacaoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteApresentacao() throws Exception {
        // Initialize the database
        apresentacaoRepository.saveAndFlush(apresentacao);
        int databaseSizeBeforeDelete = apresentacaoRepository.findAll().size();

        // Get the apresentacao
        restApresentacaoMockMvc.perform(delete("/api/apresentacaos/{id}", apresentacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Apresentacao> apresentacaoList = apresentacaoRepository.findAll();
        assertThat(apresentacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Apresentacao.class);
        Apresentacao apresentacao1 = new Apresentacao();
        apresentacao1.setId(1L);
        Apresentacao apresentacao2 = new Apresentacao();
        apresentacao2.setId(apresentacao1.getId());
        assertThat(apresentacao1).isEqualTo(apresentacao2);
        apresentacao2.setId(2L);
        assertThat(apresentacao1).isNotEqualTo(apresentacao2);
        apresentacao1.setId(null);
        assertThat(apresentacao1).isNotEqualTo(apresentacao2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ApresentacaoDTO.class);
        ApresentacaoDTO apresentacaoDTO1 = new ApresentacaoDTO();
        apresentacaoDTO1.setId(1L);
        ApresentacaoDTO apresentacaoDTO2 = new ApresentacaoDTO();
        assertThat(apresentacaoDTO1).isNotEqualTo(apresentacaoDTO2);
        apresentacaoDTO2.setId(apresentacaoDTO1.getId());
        assertThat(apresentacaoDTO1).isEqualTo(apresentacaoDTO2);
        apresentacaoDTO2.setId(2L);
        assertThat(apresentacaoDTO1).isNotEqualTo(apresentacaoDTO2);
        apresentacaoDTO1.setId(null);
        assertThat(apresentacaoDTO1).isNotEqualTo(apresentacaoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(apresentacaoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(apresentacaoMapper.fromId(null)).isNull();
    }
}
