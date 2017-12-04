import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PasswordComponent } from './password.component';

export const passwordRoute: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_PROFESSOR', 'ROLE_ALUNO', 'ROLE_SECRETARIA'],
        pageTitle: 'global.menu.account.password'
    },
    canActivate: [UserRouteAccessService]
};
