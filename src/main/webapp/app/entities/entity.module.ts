import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterArtigoModule } from './artigo/artigo.module';
import { JhipsterPropostaTeseModule } from './proposta-tese/proposta-tese.module';
import { JhipsterTeseModule } from './tese/tese.module';
import { JhipsterApresentacaoModule } from './apresentacao/apresentacao.module';
import { JhipsterBancaModule } from './banca/banca.module';
import { JhipsterFuncionarioModule } from './funcionario/funcionario.module';
import { JhipsterProfessorBancaModule } from './professor-banca/professor-banca.module';
import { JhipsterAlunoModule } from './aluno/aluno.module';
import { JhipsterProfessorModule } from './professor/professor.module';
import { JhipsterCoOrientadorModule } from './co-orientador/co-orientador.module';
import { JhipsterAreaPesquisaModule } from './area-pesquisa/area-pesquisa.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterArtigoModule,
        JhipsterPropostaTeseModule,
        JhipsterTeseModule,
        JhipsterApresentacaoModule,
        JhipsterBancaModule,
        JhipsterFuncionarioModule,
        JhipsterProfessorBancaModule,
        JhipsterAlunoModule,
        JhipsterProfessorModule,
        JhipsterCoOrientadorModule,
        JhipsterAreaPesquisaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}
