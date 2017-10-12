package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.CoOrientador;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CoOrientador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoOrientadorRepository extends JpaRepository<CoOrientador, Long> {

}
