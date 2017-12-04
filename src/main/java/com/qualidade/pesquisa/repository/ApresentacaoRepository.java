package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.Apresentacao;

import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Apresentacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApresentacaoRepository extends JpaRepository<Apresentacao, Long> {
    

    @Query("select A from Apresentacao A LEFT JOIN PropostaTese B ON A = B.apresentacao LEFT JOIN Aluno C ON B.aluno = C LEFT JOIN Tese D ON D.apresentacao = A LEFT JOIN Aluno E on D.aluno = E WHERE (C.orientador.id = ?1 OR E.orientador.id = ?1)")
    Page<Apresentacao> findAllByIdProfessor(Long userId, Pageable pageable);
}
