import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor(
      public _subirArchivoService: SubirArchivoService,
      public _modalUploadService: ModalUploadService
  ) {
   }

  ngOnInit() {
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
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

  subirImagen(){
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then( resp=> {
        this._modalUploadService.notificacion.emit( resp );
        this.cerrarModal();
    })
    .catch( err => {
      console.log('Error en la carga...');
    })
  }

}
