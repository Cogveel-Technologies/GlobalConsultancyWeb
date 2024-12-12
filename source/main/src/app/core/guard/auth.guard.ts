import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roleName = localStorage.getItem("roleName")?.toLowerCase();
    
    if (roleName === 'superadmin') {
      return true;
    } else {
      const targetUrl = state.url;
      const urlSegments = targetUrl.split('/');
      console.log(urlSegments)
      
      if (urlSegments.includes(roleName)) {
        return true;
      } else {
        this.router.navigate(['/authentication/signin']);
        return false;
      }
    }
  }
}
