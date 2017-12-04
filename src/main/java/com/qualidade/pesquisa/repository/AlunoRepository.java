package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.Aluno;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Aluno entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    @Query("select A from Aluno A where A.user.id = ?1")
    Aluno findByUserId(Long userId);

}
