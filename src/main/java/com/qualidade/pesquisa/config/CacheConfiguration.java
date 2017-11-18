package com.qualidade.pesquisa.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Artigo.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Artigo.class.getName() + ".alunos", jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.PropostaTese.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.PropostaTese.class.getName() + ".alunos", jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Tese.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Apresentacao.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Banca.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Funcionario.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.ProfessorBanca.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.ProfessorBanca.class.getName() + ".professors", jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.ProfessorBanca.class.getName() + ".bancas", jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Aluno.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Aluno.class.getName() + ".orientadors", jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Professor.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.CoOrientador.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.CoOrientador.class.getName() + ".alunos", jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.CoOrientador.class.getName() + ".professors", jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.AreaPesquisa.class.getName(), jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Aluno.class.getName() + ".artigos", jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Aluno.class.getName() + ".propostaTese", jcacheConfiguration);
            cm.createCache(com.qualidade.pesquisa.domain.Aluno.class.getName() + ".coOrientadors", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
