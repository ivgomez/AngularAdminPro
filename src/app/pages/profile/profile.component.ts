import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor( public _usuarioService: UsuarioService){
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario ){

    this.usuario.nombre = usuario.nombre;

    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
      .subscribe( resp => {
        //console.log(resp);
      });

  }

  seleccionImagen( archivo: File ) {
    if ( !archivo){
      return;
    }

    if( archivo.type.indexOf('image') ) {
      swal('Only images', 'The file selected is not an image', 'error');
      this.imagenSubir = null;
      //console.log( archivo );
      return;
    }
    
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }
}
