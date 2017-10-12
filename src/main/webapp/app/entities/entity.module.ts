import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterArtigoMySuffixModule } from './artigo/artigo-my-suffix.module';
import { JhipsterPropostaTeseMySuffixModule } from './proposta-tese/proposta-tese-my-suffix.module';
import { JhipsterTeseMySuffixModule } from './tese/tese-my-suffix.module';
import { JhipsterApresentacaoMySuffixModule } from './apresentacao/apresentacao-my-suffix.module';
import { JhipsterBancaMySuffixModule } from './banca/banca-my-suffix.module';
import { JhipsterFuncionarioMySuffixModule } from './funcionario/funcionario-my-suffix.module';
import { JhipsterProfessorBancaMySuffixModule } from './professor-banca/professor-banca-my-suffix.module';
import { JhipsterAlunoMySuffixModule } from './aluno/aluno-my-suffix.module';
import { JhipsterProfessorMySuffixModule } from './professor/professor-my-suffix.module';
import { JhipsterCoOrientadorMySuffixModule } from './co-orientador/co-orientador-my-suffix.module';
import { JhipsterAreaPesquisaMySuffixModule } from './area-pesquisa/area-pesquisa-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterArtigoMySuffixModule,
        JhipsterPropostaTeseMySuffixModule,
        JhipsterTeseMySuffixModule,
        JhipsterApresentacaoMySuffixModule,
        JhipsterBancaMySuffixModule,
        JhipsterFuncionarioMySuffixModule,
        JhipsterProfessorBancaMySuffixModule,
        JhipsterAlunoMySuffixModule,
        JhipsterProfessorMySuffixModule,
        JhipsterCoOrientadorMySuffixModule,
        JhipsterAreaPesquisaMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}
