import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( 
    public _usuariosService: UsuarioService,
    public router: Router){}

  canActivate() {
    if( this._usuariosService.estaLogueado() ){
      console.log('ESTA LOGUEADO')
      return true;
    } else {
      console.log('BLOQUEADO POR EL GUARD');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
