import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class UtilsProvider {

  constructor(private alertCtrl: AlertController,
  	private toastCtrl: ToastController) {
  }

  presentAlert(titulo, msj) {
	  let alert = this.alertCtrl.create({
	    title: titulo,
	    subTitle: msj,
	    buttons: ['Aceptar']
	  });
	  alert.present();
	}

	presentToast(msj) {
	  let toast = this.toastCtrl.create({
	    message: msj,
	    duration: 3000,
	    position: 'top'
	  });

	  toast.onDidDismiss(() => {
	    console.log('Dismissed toast');
	  });

	  toast.present();
	}

	showConfirm(titulo, msj) {
	    let confirm = this.alertCtrl.create({
	      title: titulo,
	      message: msj,
	      buttons: [
	        {
	          text: 'CANCELAR',
	          handler: () => {
	            return false;
	          }
	        },
	        {
	          text: 'ACEPTAR',
	          handler: () => {
	            return true;
	          }
	        }
	      ]
	    });

	    confirm.present();
	  }

}
