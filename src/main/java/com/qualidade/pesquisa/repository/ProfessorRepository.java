package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.Professor;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Professor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    @Query("select A from Professor A where A.user.id = ?1")
    Professor findByUserId(Long userId);


    @Query("select B from ProfessorBanca A INNER JOIN Professor B ON A.professor = B where A.banca.id=?1")
    Page<Professor> findByIdBanca(Long userId, Pageable pageable);

    @Query("select A from Professor A LEFT JOIN ProfessorBanca B ON B.professor = A where B.banca.id is null OR B.banca.id not in (?1)")
    Page<Professor> findNaoConvidadosBanca(Long bancaId, Pageable pageable);
    
}
