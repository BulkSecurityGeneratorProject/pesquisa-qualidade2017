package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.ProfessorBanca;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProfessorBanca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfessorBancaRepository extends JpaRepository<ProfessorBanca, Long> {

}
