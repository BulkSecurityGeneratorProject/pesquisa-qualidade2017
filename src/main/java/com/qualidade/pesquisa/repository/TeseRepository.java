package com.qualidade.pesquisa.repository;

import com.qualidade.pesquisa.domain.Tese;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Tese entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeseRepository extends JpaRepository<Tese, Long> {

}
