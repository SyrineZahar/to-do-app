import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/Auth.service';
import { UserRole } from '../classe/Enum/UserRole.enum';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; 
  } else {
    router.navigate(['/login']); 
    return false;
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  console.log('User fetched from AuthService:', user);
  
  if (user) {
    if (user.role.toString() === 'ADMIN') {
      return true; 
    } else {
      console.log('Access denied. User role:', user.role);
    }
  } else {
    console.log('Access denied. No user.');
  }

  return false; 
};

