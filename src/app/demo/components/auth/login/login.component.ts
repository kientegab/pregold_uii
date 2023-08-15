import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent {
	matricule: string = '';
	password: string = '';
	rememberMe: boolean = false;

	constructor(
		private layoutService: LayoutService, 
		private userService:UserService,
		private router: Router
	) {}


	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

	login() {
		console.log('Sending data to backend - Matricule:', this.matricule, 'Password:', this.password);
	  
		this.userService.login(this.matricule, this.password).subscribe(
		  (response) => {
			console.log('Login response:', response);
	  
			if (response.status === 200) {
			  // Connexion réussie, rediriger vers la page d'administration
			  this.router.navigate(['/admin']);
			} else {
			  // Autre code de statut, gérer en conséquence
			  console.error('Login error:', response);
			}
		  },
		  (error) => {
			// Handle login error, e.g., show error message.
			console.error('Login error:', error);
		  }
		);
	  }
	  

}
