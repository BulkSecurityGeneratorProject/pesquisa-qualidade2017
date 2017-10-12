package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.Banca;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Banca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BancaRepository extends JpaRepository<Banca, Long> {

}
