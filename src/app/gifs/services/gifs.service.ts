import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey: string       = 'UY7zjwx6t4wbrESZyVuG6SoCzZBQz1Ca';
  private _historial: string[] = [];
  private servicioUrl: string  = 'https://api.giphy.com/v1/gifs';

  // TODO: cambiar any por su tipo 
  public resultados: Gif[] = [];

  get historia() {
     return [...this._historial];
  }

  //trabaja como si fuera un singleton
  constructor ( private http: HttpClient ) { 
    
    //otra forma
    //this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    



    if( localStorage.getItem('historial') ){
      this._historial = JSON.parse( localStorage.getItem('historial')!);
    }

    //ultimo historial de busqueda
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];



  }




  buscarGifs ( query: string = '' ) {
    
    query = query.trim().toLocaleLowerCase();

    //si no existe esa palabra en el arreglo lo incorpora
    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      //corto el arreglo en 10
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

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
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
      

    //retorna observables y se pueden añadir funcionalidades 
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params } )
            .subscribe ( (resp) => {
              
              this.resultados = resp.data;
              
              localStorage.setItem('resultados', JSON.stringify(this.resultados));

            } );
  
  
  }



}
