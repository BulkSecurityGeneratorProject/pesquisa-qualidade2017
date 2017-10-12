package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.Artigo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Artigo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArtigoRepository extends JpaRepository<Artigo, Long> {

}
