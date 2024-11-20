import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/classe/Enum/UserRole.enum';
import { User } from 'src/app/classe/User';
import { AuthService } from 'src/app/service/Auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService,private router: Router) { }

  // Initialisation du formulaire lors de l'initialisation du composant
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{5,}$')]]
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.signupForm.valid) {
      let { username, email, password } = this.signupForm.value;
      let user = new User(username, 0, UserRole.EXECUTOR, email, password);
    
      this.authService.registerUser(user).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.router.navigate(['/login']); 

        },
        error: (error) => {
          console.error('Signup failed:', error);
        }
      });
    }
  }
}
