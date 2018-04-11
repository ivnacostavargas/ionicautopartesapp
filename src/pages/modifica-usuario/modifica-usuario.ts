import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

// Provider / Servicios
import { UtilsProvider } from "../../providers/utils/utils";
import { UsuariosProvider } from "../../providers/usuarios/usuarios";

// Paginas 
import { UsuariosPage } from "../index.paginas";

// Interfaces 
import { Usuario } from "../../interfaces/Usuario.interface";

@Component({
  selector: 'page-modifica-usuario',
  templateUrl: 'modifica-usuario.html',
})
export class ModificaUsuarioPage {

	pass1:string = "";
	pass2:string = "";
	usuario:Usuario;
	loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });

  constructor(public navCtrl: NavController, 
  	private usuariosProvider: UsuariosProvider,
  	private utils: UtilsProvider,
  	private loadingCtrl: LoadingController,
  	public navParams: NavParams) {
  	this.usuario = this.navParams.get("usuario");
  }

  updateUser(){
  	console.log( this.usuario );

  	if (this.pass1 != this.pass2) {
  		this.utils.presentAlert('Aviso', 'El password debe de ser igual que la confirmacion.');
  		return;
  	}
  	this.usuario.password = this.pass1;

  	this.loader.present();
  	this.usuariosProvider.updateUser( this.usuario ).subscribe( data => {
  		this.controlProgres();
  		if (data.status.code == 'OK') {
  			this.utils.presentAlert("Aviso", "El usuario se actualizo correctamente" );
  			this.navCtrl.setRoot( UsuariosPage );
  		}else{
  			this.utils.presentAlert("Error", data.status.message );
  		}
  	}, error => {
  		this.controlProgres();
  		this.utils.presentAlert("Error", "No es posible realizar esta operación, intente nuevamente");
  	});

  }

  controlProgres(){
    this.loader.dismiss();
    this.loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 10000
      });
  }

}
