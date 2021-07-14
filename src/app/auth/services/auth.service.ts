import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baserUrl;
  private _auth: Auth | undefined;


  get auth(){
    return {...this._auth}
  }

  constructor( private http: HttpClient ) { }

  verificaAutenticacion(): Observable<boolean> {

    if( !localStorage.getItem('id') ){

      return of(false);
    }

    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
        .pipe(
          map( auth => {
            this._auth = auth;
            return true
          } )
        )

    
  }


  login(){
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
        .pipe(
          tap( resp => this._auth = resp ),
          tap( resp => localStorage.setItem('id', resp.id) ),
        );
  }


}
