package com.qualidade.pesquisa.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Apresentacao.
 */
@Entity
@Table(name = "apresentacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Apresentacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "flgagendamentoaprovado")
    private Boolean flgagendamentoaprovado;

    @NotNull
    @Column(name = "flgproposta", nullable = false)
    private Boolean flgproposta;

    @OneToOne
    @JoinColumn(unique = true)
    private Banca banca;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public Apresentacao data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Boolean isFlgagendamentoaprovado() {
        return flgagendamentoaprovado;
    }

    public Apresentacao flgagendamentoaprovado(Boolean flgagendamentoaprovado) {
        this.flgagendamentoaprovado = flgagendamentoaprovado;
        return this;
    }

    public void setFlgagendamentoaprovado(Boolean flgagendamentoaprovado) {
        this.flgagendamentoaprovado = flgagendamentoaprovado;
    }

    public Boolean isFlgproposta() {
        return flgproposta;
    }

    public Apresentacao flgproposta(Boolean flgproposta) {
        this.flgproposta = flgproposta;
        return this;
    }

    public void setFlgproposta(Boolean flgproposta) {
        this.flgproposta = flgproposta;
    }

    public Banca getBanca() {
        return banca;
    }

    public Apresentacao banca(Banca banca) {
        this.banca = banca;
        return this;
    }

    public void setBanca(Banca banca) {
        this.banca = banca;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Apresentacao apresentacao = (Apresentacao) o;
        if (apresentacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), apresentacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Apresentacao{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", flgagendamentoaprovado='" + isFlgagendamentoaprovado() + "'" +
            ", flgproposta='" + isFlgproposta() + "'" +
            "}";
    }
}
