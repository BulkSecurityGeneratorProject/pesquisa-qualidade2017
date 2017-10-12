package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.AreaPesquisa;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AreaPesquisa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AreaPesquisaRepository extends JpaRepository<AreaPesquisa, Long> {

}
