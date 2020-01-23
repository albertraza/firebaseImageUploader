import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { FileModel } from '../../models/File.model';

@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styles: []
})
export class CargarComponent implements OnInit {

  estaSobre = false;
  imagenes: FileModel[] = [];

  constructor(private _imagenesService: ImagenService) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this._imagenesService.cargarImagenesFirebase(this.imagenes);
  }

  limpiarImagenes() {
    this.imagenes = [];
  }

}
