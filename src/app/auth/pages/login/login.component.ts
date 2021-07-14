import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor( private router: Router,
               private authService: AuthService  ) { }

  login(){
    //ir al backend
    //un user

    this.authService.login()
      .subscribe( resp => {
        console.log('esta es la resp',resp)

        if( resp.id ){

          this.router.navigate(['./heroes'])

        }

      } )

  }

}
