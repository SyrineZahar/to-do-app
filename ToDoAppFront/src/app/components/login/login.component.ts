import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classe/User';
import { AuthService } from 'src/app/service/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  image: string = "assets/toDoApp.png";
  errorMessage!: string; 
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: (user: User) => {
        console.log('Login successful:', user);
        this.router.navigate(['/kanban']);
      },
      error: (error: any) => {
        console.log('Login successful:', email,password);
        console.error('Login failed:', error);
        this.errorMessage = 'Login ou mot de passe incorrect'; 
      }
    });
  }
  

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.login(email, password); 
    }
  }
}