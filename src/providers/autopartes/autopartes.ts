import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

// Constantes
import { URL_BASE } from "../../pages/data/data.constantes";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AutopartesProvider {

  URL_BASE:string = URL_BASE;

  constructor(public http: Http) {
    this.http = http;
  } 


  getAutopartes(datos:any){
  	let request = datos;
  	console.log(JSON.stringify( request ));
  	let url = this.URL_BASE + "Autopartes/getAutopartes";
  	
  	let header = new Headers();
   	header.append('Access-Control-Allow-Origin', '*');
          
   	return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
   			.map( resp => resp.json() );
  }

  altaAutoparte(datos:any){
    let request = datos;
    console.log(JSON.stringify( request ));
    let url = this.URL_BASE + "Autopartes/altaAutoparte";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
          
     return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
         .map( resp => resp.json() );
  }

  setFotos( idAutoparte, img:string ){
    let request = { 'idAutoparte': idAutoparte, 'foto': img };
    console.log(JSON.stringify( request ));
    let url = this.URL_BASE + "Autopartes/setFotos";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
          
     return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
         .map( resp => resp.json() );
  }

  actualizaEstatus( id, status:string ){
    let request = { 'id': id, 'status': status };
    console.log(JSON.stringify( request ));
    let url = this.URL_BASE + "Autopartes/actualizaEstatus";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
          
     return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
         .map( resp => resp.json() );
  }

  eliminarAutoparte(id){
    let request = { 'id': id };
    console.log(JSON.stringify( request ));
    let url = this.URL_BASE + "Autopartes/eliminarAutoparte";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
          
     return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
         .map( resp => resp.json() );
  }

  eliminarFoto(id){
    let request = { 'idFoto': id };
    console.log(JSON.stringify( request ));
    let url = this.URL_BASE + "Autopartes/eliminarFoto";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
          
     return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
         .map( resp => resp.json() );
  }

  actualizarAutoparte( autoparte:any ){
    let request = autoparte;
    console.log(JSON.stringify( request ));
    let url = this.URL_BASE + "Autopartes/actualizarAutoparte";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
          
     return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
         .map( resp => resp.json() );
  }

}
