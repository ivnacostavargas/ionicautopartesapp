import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Provaider / Servicio
import { UtilsProvider } from "../../providers/utils/utils";
import { UsuariosProvider } from "../../providers/usuarios/usuarios";

// Interfaces 
import { Usuario } from "../../interfaces/Usuario.interface";

// Paginas
import { HomePage } from "../index.paginas";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credenciales = { nickname: '', password : '' };

  constructor(public navCtrl: NavController,
  			private utils: UtilsProvider,
	        private usuariosProvider: UsuariosProvider,
          private menuCtrl: MenuController,
	        private storage: Storage) {
          this.menuCtrl.enable(false);
        }


  login(){
  	if (this.credenciales.nickname == '' && this.credenciales.password == '') {
  		this.utils.presentAlert('Aviso','Debes de ingresar tus credenciales');
  		return;
  	}

    this.usuariosProvider.login(this.credenciales).subscribe( data => {
      console.log( data );
      if (data != null) {
        if (data.status.code == 'OK') {
          this.getDataUsu(this.credenciales.nickname);
        }else{
          this.utils.presentAlert('Aviso',data.status.message);
        }
      }
    }, error=>{
      console.log(error);
    });

  }

  getDataUsu(nickname){
    this.usuariosProvider.getUsuario(nickname).subscribe(data =>{

    	if (data.status.code == 'OK') {
    		let usuario:Usuario = data.dto;
    		console.log(usuario);
	        this.storage.set('Usuario', usuario);

	        this.navCtrl.setRoot( HomePage );
    	}else{
    		this.utils.presentAlert('Aviso',data.status.message);
    	}

    }, error =>{
    	console.log( error );
    });

  }


}
