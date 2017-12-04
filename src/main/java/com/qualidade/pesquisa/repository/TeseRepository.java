package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.Tese;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Tese entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeseRepository extends JpaRepository<Tese, Long> {

    @Query("select A from Tese A INNER JOIN Aluno B ON A.aluno = B WHERE B.user.id = ?1")
    Page<Tese> findAllAlunoByUserId(Long userId, Pageable pageable);

    @Query("select A from Tese A INNER JOIN Aluno B ON A.aluno = B INNER JOIN Professor C ON B.orientador = C WHERE C.user.id = ?1 ")
    Page<Tese> findAllOrientadorByUserId(Long userId, Pageable pageable);

}
