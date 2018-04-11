  import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

// Constantes
import { URL_BASE } from "../../pages/data/data.constantes";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsuariosProvider {

  URL_BASE:string = URL_BASE;

  constructor(public http: Http) {
    this.http = http;
  } 

  login(datos:any){
  	let request = datos;
  	console.log(JSON.stringify( request ));
  	let url = this.URL_BASE + "Usuarios/login";
  	
  	let header = new Headers();
   	header.append('Access-Control-Allow-Origin', '*');
   	console.log(url);
          
   	return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
   			.map( resp => resp.json() );
  }

  getUsuario(datos:any){
    let request = {'nickname':datos};
    console.log(JSON.stringify( request ));
    let url = this.URL_BASE + "Usuarios/getUsuario";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
     console.log(url);
          
     return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
         .map( resp => resp.json() );
  }

  listUsuarios(datos:any){
    let request = datos;
    console.log(JSON.stringify( request ));
    let url = this.URL_BASE + "Usuarios/listUsuarios";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
     console.log(url);
          
     return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
         .map( resp => resp.json() );
  }

  altaUsuario( datos:any ){
    let request = datos;
    console.log(JSON.stringify( request ));
    let url = this.URL_BASE + "Usuarios/altaUsuario";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
     console.log(url);
          
     return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
         .map( resp => resp.json() );
  }

  updateUser( datos:any ){
    let request = datos;
    console.log(JSON.stringify( request ));
    let url = this.URL_BASE + "Usuarios/updateUser";
    
    let header = new Headers();
     header.append('Access-Control-Allow-Origin', '*');
     console.log(url);
          
     return this.http.post( encodeURI( url ), JSON.stringify( request ) , { headers: header } )
         .map( resp => resp.json() );
  }

}
