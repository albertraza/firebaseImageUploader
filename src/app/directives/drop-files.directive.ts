import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileModel } from '../models/File.model';

@Directive({
  selector: '[appDropFiles]'
})
export class DropFilesDirective {

  @Input() imagenes: FileModel[] = [];

@Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: DragEvent ) {
    this._prevenirDetener(event);
    this.mouseSobre.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return;
    }

    this._extraerArchivos(transferencia.files);

    this._prevenirDetener( event );
    this.mouseSobre.emit(false);
  }

  private _extraerArchivos(listaArchivo: FileList) {

    for (const propArchivo of Object.getOwnPropertyNames(listaArchivo)) {
      const archivoImagen = listaArchivo[propArchivo];
      
      if (this._archivoPuedeSerCargado(archivoImagen)) {
        const imagen = new FileModel(archivoImagen);
        this.imagenes.push(imagen);
      }
    }
    console.log(this.imagenes);
  }

  private _getTransferencia( event: any ) {
    console.log(event);
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  // Validaciones

  private _archivoPuedeSerCargado(archivo: File) {
    if (!this._archivoYaFueDroppeado(archivo.name) && this._esImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _prevenirDetener( event: DragEvent ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDroppeado( nombre: string ): boolean {
    for (let imagen of this.imagenes) {
      if (imagen.nombre === nombre ){
        console.log(`El archivo ${nombre} ya fue agregado`);
        return true;
      }
    }
    return false;
  }

  private _esImagen( tipo: string ): boolean {
    return (tipo === '' || tipo === undefined) ? false : tipo.startsWith('image');
  }

}
