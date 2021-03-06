import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  
})
export class SidebarComponent {

  constructor( private historialBusqueda: GifsService) {}


  get historial(){
    return this.historialBusqueda.historia
  }

  buscar( termino:string ) {
    console.log(termino)

    this.historialBusqueda.buscarGifs(termino);



  }


}
