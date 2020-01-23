import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileModel } from '../models/File.model';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private _carpetaImg = 'img';

  constructor( private _database: AngularFirestore ) { }


  cargarImagenesFirebase(imagenes: FileModel[] ) {
    const  storageRef = firebase.storage().ref();

    for ( const imagen of imagenes) {
      imagen.estaSubiendo = true;
      if (imagen.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef
                                                     .child(`${this._carpetaImg}/${imagen.nombre}`)
                                                     .put(imagen.archivo);

      uploadTask.on ( firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => imagen.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error: any) => console.log(error),
        () => {
          console.log('imagen cargada correctamente');

          uploadTask.snapshot.ref.getDownloadURL().then((url) => {

            imagen.url = url;
            imagen.estaSubiendo = false;
            this.guardarImagen({nombre: imagen.nombre, url: imagen.url});

          });
          
        });
    }

  }

  private guardarImagen(imagen: { nombre: string, url: string } ) {
    this._database.collection(`/${this._carpetaImg}`).add(imagen);
  }
}
