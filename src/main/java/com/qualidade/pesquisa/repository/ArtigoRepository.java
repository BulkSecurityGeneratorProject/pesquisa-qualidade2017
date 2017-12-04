package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.Artigo;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Artigo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArtigoRepository extends JpaRepository<Artigo, Long> {

    @Query("select A from Artigo A INNER JOIN Aluno B ON A.aluno = B WHERE B.user.id=?1")
    Page<Artigo> findAllByUserId (Long userId, Pageable pageable);
}
