package com.qualidade.pesquisa.web.rest;

import com.qualidade.pesquisa.JhipsterApp;

import com.qualidade.pesquisa.domain.Artigo;
import com.qualidade.pesquisa.repository.ArtigoRepository;
import com.qualidade.pesquisa.service.ArtigoService;
import com.qualidade.pesquisa.service.AlunoService;
import com.qualidade.pesquisa.service.dto.ArtigoDTO;
import com.qualidade.pesquisa.service.mapper.ArtigoMapper;
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
 * Test class for the ArtigoResource REST controller.
 *
 * @see ArtigoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class ArtigoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATAPUBLICACAO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATAPUBLICACAO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final Boolean DEFAULT_FLGRELACIONADOPESQUISA = false;
    private static final Boolean UPDATED_FLGRELACIONADOPESQUISA = true;

    @Autowired
    private ArtigoRepository artigoRepository;

    @Autowired
    private ArtigoMapper artigoMapper;

    @Autowired
    private ArtigoService artigoService;

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

    private MockMvc restArtigoMockMvc;

    private Artigo artigo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArtigoResource artigoResource = new ArtigoResource(artigoService, alunoService);
        this.restArtigoMockMvc = MockMvcBuilders.standaloneSetup(artigoResource)
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
    public static Artigo createEntity(EntityManager em) {
        Artigo artigo = new Artigo()
            .nome(DEFAULT_NOME)
            .titulo(DEFAULT_TITULO)
            .datapublicacao(DEFAULT_DATAPUBLICACAO)
            .link(DEFAULT_LINK)
            .flgrelacionadopesquisa(DEFAULT_FLGRELACIONADOPESQUISA);
        return artigo;
    }

    @Before
    public void initTest() {
        artigo = createEntity(em);
    }

    @Test
    @Transactional
    public void createArtigo() throws Exception {
        int databaseSizeBeforeCreate = artigoRepository.findAll().size();

        // Create the Artigo
        ArtigoDTO artigoDTO = artigoMapper.toDto(artigo);
        restArtigoMockMvc.perform(post("/api/artigos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(artigoDTO)))
            .andExpect(status().isCreated());

        // Validate the Artigo in the database
        List<Artigo> artigoList = artigoRepository.findAll();
        assertThat(artigoList).hasSize(databaseSizeBeforeCreate + 1);
        Artigo testArtigo = artigoList.get(artigoList.size() - 1);
        assertThat(testArtigo.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testArtigo.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testArtigo.getDatapublicacao()).isEqualTo(DEFAULT_DATAPUBLICACAO);
        assertThat(testArtigo.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testArtigo.isFlgrelacionadopesquisa()).isEqualTo(DEFAULT_FLGRELACIONADOPESQUISA);
    }

    @Test
    @Transactional
    public void createArtigoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = artigoRepository.findAll().size();

        // Create the Artigo with an existing ID
        artigo.setId(1L);
        ArtigoDTO artigoDTO = artigoMapper.toDto(artigo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArtigoMockMvc.perform(post("/api/artigos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(artigoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Artigo in the database
        List<Artigo> artigoList = artigoRepository.findAll();
        assertThat(artigoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = artigoRepository.findAll().size();
        // set the field null
        artigo.setNome(null);

        // Create the Artigo, which fails.
        ArtigoDTO artigoDTO = artigoMapper.toDto(artigo);

        restArtigoMockMvc.perform(post("/api/artigos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(artigoDTO)))
            .andExpect(status().isBadRequest());

        List<Artigo> artigoList = artigoRepository.findAll();
        assertThat(artigoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTituloIsRequired() throws Exception {
        int databaseSizeBeforeTest = artigoRepository.findAll().size();
        // set the field null
        artigo.setTitulo(null);

        // Create the Artigo, which fails.
        ArtigoDTO artigoDTO = artigoMapper.toDto(artigo);

        restArtigoMockMvc.perform(post("/api/artigos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(artigoDTO)))
            .andExpect(status().isBadRequest());

        List<Artigo> artigoList = artigoRepository.findAll();
        assertThat(artigoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFlgrelacionadopesquisaIsRequired() throws Exception {
        int databaseSizeBeforeTest = artigoRepository.findAll().size();
        // set the field null
        artigo.setFlgrelacionadopesquisa(null);

        // Create the Artigo, which fails.
        ArtigoDTO artigoDTO = artigoMapper.toDto(artigo);

        restArtigoMockMvc.perform(post("/api/artigos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(artigoDTO)))
            .andExpect(status().isBadRequest());

        List<Artigo> artigoList = artigoRepository.findAll();
        assertThat(artigoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllArtigos() throws Exception {
        // Initialize the database
        artigoRepository.saveAndFlush(artigo);

        // Get all the artigoList
        restArtigoMockMvc.perform(get("/api/artigos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(artigo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].datapublicacao").value(hasItem(DEFAULT_DATAPUBLICACAO.toString())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())))
            .andExpect(jsonPath("$.[*].flgrelacionadopesquisa").value(hasItem(DEFAULT_FLGRELACIONADOPESQUISA.booleanValue())));
    }

    @Test
    @Transactional
    public void getArtigo() throws Exception {
        // Initialize the database
        artigoRepository.saveAndFlush(artigo);

        // Get the artigo
        restArtigoMockMvc.perform(get("/api/artigos/{id}", artigo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(artigo.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.datapublicacao").value(DEFAULT_DATAPUBLICACAO.toString()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()))
            .andExpect(jsonPath("$.flgrelacionadopesquisa").value(DEFAULT_FLGRELACIONADOPESQUISA.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingArtigo() throws Exception {
        // Get the artigo
        restArtigoMockMvc.perform(get("/api/artigos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArtigo() throws Exception {
        // Initialize the database
        artigoRepository.saveAndFlush(artigo);
        int databaseSizeBeforeUpdate = artigoRepository.findAll().size();

        // Update the artigo
        Artigo updatedArtigo = artigoRepository.findOne(artigo.getId());
        updatedArtigo
            .nome(UPDATED_NOME)
            .titulo(UPDATED_TITULO)
            .datapublicacao(UPDATED_DATAPUBLICACAO)
            .link(UPDATED_LINK)
            .flgrelacionadopesquisa(UPDATED_FLGRELACIONADOPESQUISA);
        ArtigoDTO artigoDTO = artigoMapper.toDto(updatedArtigo);

        restArtigoMockMvc.perform(put("/api/artigos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(artigoDTO)))
            .andExpect(status().isOk());

        // Validate the Artigo in the database
        List<Artigo> artigoList = artigoRepository.findAll();
        assertThat(artigoList).hasSize(databaseSizeBeforeUpdate);
        Artigo testArtigo = artigoList.get(artigoList.size() - 1);
        assertThat(testArtigo.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testArtigo.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testArtigo.getDatapublicacao()).isEqualTo(UPDATED_DATAPUBLICACAO);
        assertThat(testArtigo.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testArtigo.isFlgrelacionadopesquisa()).isEqualTo(UPDATED_FLGRELACIONADOPESQUISA);
    }

    @Test
    @Transactional
    public void updateNonExistingArtigo() throws Exception {
        int databaseSizeBeforeUpdate = artigoRepository.findAll().size();

        // Create the Artigo
        ArtigoDTO artigoDTO = artigoMapper.toDto(artigo);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restArtigoMockMvc.perform(put("/api/artigos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(artigoDTO)))
            .andExpect(status().isCreated());

        // Validate the Artigo in the database
        List<Artigo> artigoList = artigoRepository.findAll();
        assertThat(artigoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteArtigo() throws Exception {
        // Initialize the database
        artigoRepository.saveAndFlush(artigo);
        int databaseSizeBeforeDelete = artigoRepository.findAll().size();

        // Get the artigo
        restArtigoMockMvc.perform(delete("/api/artigos/{id}", artigo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Artigo> artigoList = artigoRepository.findAll();
        assertThat(artigoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Artigo.class);
        Artigo artigo1 = new Artigo();
        artigo1.setId(1L);
        Artigo artigo2 = new Artigo();
        artigo2.setId(artigo1.getId());
        assertThat(artigo1).isEqualTo(artigo2);
        artigo2.setId(2L);
        assertThat(artigo1).isNotEqualTo(artigo2);
        artigo1.setId(null);
        assertThat(artigo1).isNotEqualTo(artigo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArtigoDTO.class);
        ArtigoDTO artigoDTO1 = new ArtigoDTO();
        artigoDTO1.setId(1L);
        ArtigoDTO artigoDTO2 = new ArtigoDTO();
        assertThat(artigoDTO1).isNotEqualTo(artigoDTO2);
        artigoDTO2.setId(artigoDTO1.getId());
        assertThat(artigoDTO1).isEqualTo(artigoDTO2);
        artigoDTO2.setId(2L);
        assertThat(artigoDTO1).isNotEqualTo(artigoDTO2);
        artigoDTO1.setId(null);
        assertThat(artigoDTO1).isNotEqualTo(artigoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(artigoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(artigoMapper.fromId(null)).isNull();
    }
}
