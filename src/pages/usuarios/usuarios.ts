import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Paginas
import { CrearUsuarioPage,
    ModificaUsuarioPage } from "../index.paginas";

// Interfaces 
import { Usuario } from "../../interfaces/Usuario.interface";

// Servicios / Provider
import { UsuariosProvider } from "../../providers/usuarios/usuarios";
import { UtilsProvider } from "../../providers/utils/utils";

@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  list_usuarios:Usuario[];
  search:any = {
    nombre:""
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public usuariosProvider: UsuariosProvider,
    public utils: UtilsProvider) {
    this.listUsuarios();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuariosPage');
  }

  crearUsuario(){
  	this.navCtrl.push( CrearUsuarioPage );
  }

  listUsuarios(){
    this.usuariosProvider.listUsuarios( this.search ).subscribe( data =>{
      console.log(data);
      if (data.status.code == 'OK') {
        this.list_usuarios = data.dto.slice(0);
      }else{
        this.utils.presentToast(data.status.message);
      }
    },error => {});
  }

  modificaUsuario( usuario:Usuario ){
    this.navCtrl.push( ModificaUsuarioPage, { "usuario" : usuario } );
  }

}
