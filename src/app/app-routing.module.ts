import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardPublicComponent } from './public/dashboard-public.component';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { CreerModifierUserComponent } from './administration/parametre/user/creer-modifier-user/creer-modifier-user.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    
    {
        path: '', component: LoginComponent,
        children: [
            //{ path: '', loadChildren: () => import('./public/home-page/home-page.module').then(m => m.HomePageModule) },
            //{ path: 'service', loadChildren: () => import('./public/page-public-exemple/page-public-exemple.module').then(m => m.PagePublicExempleModule) },
        ]
    },

    {
        path: 'register', component: CreerModifierUserComponent,
    },

    {
        path: 'admin', component: AppLayoutComponent,
        children: [
            
            { path: '', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
            //{ path: '' ,loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
            //{ path: '', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
            // { path: 'exemple', data: { breadcrumb: 'exemple' },loadChildren: () => import('./administration/parametre/parametre.module').then(m => m.ParametreModule) },
            //{ path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
        ]
    },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    //{ path: 'profile', data: { breadcrumb: 'Profile' },loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
    //{ path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
