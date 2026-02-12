import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router)
  private authService = inject(Auth)



  email:string =''
  password:string=''
  isLoading:boolean=false
  errorMessage: string = ''
  onSubmit(){
    if (!this.email || !this.password) return

    this.isLoading = true;
    this.errorMessage = '';

    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login Success:', response);
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login Failed:', err);
        this.isLoading = false;
        this.errorMessage = err.error.error || 'Something went wrong';
      }
    });

  }
}
