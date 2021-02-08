import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey: string       = 'UY7zjwx6t4wbrESZyVuG6SoCzZBQz1Ca';
  private _historial: string[] = [];

  // TODO: cambiar any por su tipo 
  public resultados: any[] = [];

  get historia() {
     return [...this._historial];
  }

  constructor ( private http: HttpClient ) { }




  buscarGifs ( query: string = '' ) {
    
    query = query.trim().toLocaleLowerCase();

    //si no existe esa palabra en el arreglo lo incorpora
    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      //corto el arreglo en 10
      this._historial = this._historial.splice(0,10);
    }

    
    //una forma de pegarle a una api 

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=UY7zjwx6t4wbrESZyVuG6SoCzZBQz1Ca&q=xmen&limit=10')
    //   .then ( resp => {
    //     resp.json().then( data => {
    //       console.log(data);
    //     })
    // })
    
    //otro forma de hacerlo -> abria q poner el async en la funcion

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=UY7zjwx6t4wbrESZyVuG6SoCzZBQz1Ca&q=xmen&limit=10');
    // const data = await resp.json();
    // console.log(data);  
    

    //retorna observables y se pueden añadir funcionalidades 
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=UY7zjwx6t4wbrESZyVuG6SoCzZBQz1Ca&q=${ query }&limit=10`)
            .subscribe ( (resp: any) => {
              console.log( resp.data )
              this.resultados = resp.data
            } );
  
  
  }



}
