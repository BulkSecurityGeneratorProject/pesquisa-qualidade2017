package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.Apresentacao;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Apresentacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApresentacaoRepository extends JpaRepository<Apresentacao, Long> {

}
