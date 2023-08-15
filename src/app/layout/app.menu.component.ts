import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Accueil',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/']
                    },
                    {
                        label: 'Paramètres',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Ministere',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/ministere']
                            },
                            {
                                label: 'Structure',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/structure']
                            },
                            {
                                label: 'Indicateur',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/indicateur']
                            },
                            {
                                label: 'Activite',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/activite']
                            },
                            {
                                label: 'Document',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/admin/document']
                            },
                            
                        ]
                    },
                    {
                        label: 'Utilisteurs',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'List des agents',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/admin/user']
                            },
                            /*{
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Register',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/auth/register']
                            },
                            {
                                label: 'Forgot Password',
                                icon: 'pi pi-fw pi-question',
                                routerLink: ['/auth/forgotpassword']
                            },
                            {
                                label: 'New Password',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/auth/newpassword']
                            },
                            {
                                label: 'Verification',
                                icon: 'pi pi-fw pi-envelope',
                                items[

                                ]
                            },
                            {
                                label: 'Lock Screen',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/auth/lockscreen']
                            }*/
                        ]
                    },
                    /*{
                        label: 'Menu1',
                        icon: 'pi pi-fw pi-list',
                        items: [
                            {
                                label: 'Sous-menu1',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/blog/list']
                            },
                        ]
                    },*/
                ]
            },

        ];
    }
}
