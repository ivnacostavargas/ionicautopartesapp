import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

// Constantes
import { URL_BASE } from "../../pages/data/data.constantes";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoriasProvider {

  URL_BASE:string = URL_BASE;

  constructor(public http: Http) {
    this.http = http;
  } 

  altaCategoria(datos:any){
  	let request = datos;
  	console.log(JSON.stringify( request ));
  	let url = this.URL_BASE + "Categorias/altaCategoria";
  	
  	let header = new Headers();
   	header.append('Access-Control-Allow-Origin', '*');
   	console.log(url);
          
   	return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
   			.map( resp => resp.json() );
  }

  deleteCategoria(datos:any){
    let request = datos;
    console.log(JSON.stringify( request ));
    let url = this.URL_BASE + "Categorias/deleteCategoria";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
     console.log(url);
          
     return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
         .map( resp => resp.json() );
  }


  getCategorias(){
    let url = this.URL_BASE + "Categorias/getCategorias";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
     console.log(url);
          
     return this.http.post( encodeURI( url ), null , { headers: header } )
         .map( resp => resp.json() );
  }

}
