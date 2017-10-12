package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.PropostaTese;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PropostaTese entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropostaTeseRepository extends JpaRepository<PropostaTese, Long> {

}
