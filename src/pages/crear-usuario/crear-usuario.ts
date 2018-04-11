import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

// Provider / Servicios
import { UtilsProvider } from "../../providers/utils/utils";
import { UsuariosProvider } from "../../providers/usuarios/usuarios";

// Interfaces
import { Usuario } from "../../interfaces/Usuario.interface";

// Paginas 
import { UsuariosPage } from "../index.paginas";

@Component({
  selector: 'page-crear-usuario',
  templateUrl: 'crear-usuario.html',
})
export class CrearUsuarioPage {

	pass1:string;
	pass2:string;
	usuario:Usuario = {
		idUsuario: 0,
	    nickname: '',
	    nombre: '',
	    apellidos: '',
	    clasificacion: '',
	    email: '',
	    foto: '',
	    fechaRegistro: '',
	    telefono: '',
      password: ''
	}

	loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public loadingCtrl: LoadingController,
  	private usuariosProvider: UsuariosProvider,
  	public utils: UtilsProvider) {
  }

  altaUsuario(){

  	if (this.usuario.nickname == '') {
  		this.utils.presentAlert('Aviso', 'Debe de introducir un Sobrenombre valido.');
  		return;
  	}

  	if (this.pass1 == '' || this.pass1 == undefined) {
  		this.utils.presentAlert('Aviso', 'Debe de introducir una contraseña valida.');
  		return;
  	}

  	if (this.pass1 == this.pass2) {
  		this.usuario.password = this.pass1;

  		this.loader.present();
  		this.usuariosProvider.altaUsuario( this.usuario ).subscribe( data => {
  			this.controlProgres();
  			if (data.status.code == 'OK') {
  				this.utils.presentAlert("Aviso", "El usuario se dio de alta correctamente" );
  				this.navCtrl.setRoot( UsuariosPage );
  			}else{
  				this.utils.presentAlert("Error", data.status.message );
  			}
  		}, error => {
  			this.controlProgres();
  			this.utils.presentAlert("Error", "No es posible realizar esta operación, intente nuevamente");
  		} );
  	}else{
  		this.utils.presentAlert('Aviso', 'El password debe de ser igual que la confirmacion.');
  	}
  }

  controlProgres(){
    this.loader.dismiss();
    this.loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 10000
      });
  }

}
