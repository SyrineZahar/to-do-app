import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/Auth.service';


@Component({
  selector: 'app-navbar', 
  templateUrl: './navbar.component.html', 
  styleUrls: ['./navbar.component.css'] 
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadGoogleTranslate(); 
  }

  loadGoogleTranslate(): void {
    let script = document.createElement('script'); 
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.type = 'text/javascript'; 
    document.body.appendChild(script); 
    
    let googleTranslateInit = document.createElement('script'); 
    googleTranslateInit.type = 'text/javascript'; 
    googleTranslateInit.innerHTML = `
      function googleTranslateElementInit() {
          new google.translate.TranslateElement(
              {pageLanguage: 'fr'},
              'google_translate_element'
          );
      }
    `; 
    document.body.appendChild(googleTranslateInit); 
  }


  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
