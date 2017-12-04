package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.ProfessorBanca;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProfessorBanca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfessorBancaRepository extends JpaRepository<ProfessorBanca, Long> {

  @Query("select A from ProfessorBanca A where A.professor.id = ?1 AND A.banca.id = ?2")
  ProfessorBanca findByBancaProfessor (Long idProfessor, Long idBanca);


  @Query("select A from ProfessorBanca A where A.professor.user.id = ?1")
  Page<ProfessorBanca> findAllByUserId (Long userId, Pageable pageable);
  
}
