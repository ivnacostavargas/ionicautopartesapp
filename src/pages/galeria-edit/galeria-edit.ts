import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';

// Constantes 
import { IMG_DUMMY, URL_IMG } from "../data/data.constantes";

// Providers / Servicios 
import { AutopartesProvider } from "../../providers/autopartes/autopartes";
import { UtilsProvider } from "../../providers/utils/utils"; 

// Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

// Interfaces 
import { Autoparte } from "../../interfaces/Autoparte.interface";
import { Foto } from "../../interfaces/Foto.interface";

// Paginas 
import { HomePage } from "../index.paginas";

@Component({
  selector: 'page-galeria-edit',
  templateUrl: 'galeria-edit.html',
})
export class GaleriaEditPage {

	img:string = "";
	url_img:string = URL_IMG;
	list_imagenes:Foto[];
	autoparte:Autoparte;


	loader = this.loadingCtrl.create({
	      content: "Please wait...",
	      duration: 10000
	    });

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private imagePicker: ImagePicker,
  	public loadingCtrl: LoadingController,
  	private autopartesProvider: AutopartesProvider,
  	private utilsProvider: UtilsProvider,
  	private platform: Platform,
  	private camera: Camera) {
  	this.autoparte = this.navParams.get('autoparte');
  	this.list_imagenes = this.autoparte.fotos.slice();
  }

  takePhoto(){
  	const options: CameraOptions = {
  	  quality: 50,
  	  destinationType: this.camera.DestinationType.DATA_URL,
  	  encodingType: this.camera.EncodingType.JPEG,
  	  mediaType: this.camera.MediaType.PICTURE
  	}

  	if ( this.platform.is("cordova") ) {
  		this.camera.getPicture(options).then((imageData) => {
  		 this.img = imageData;
  		}, (err) => {
  		 console.log( JSON.stringify( err ) );
  		});
  	}else{
  		this.img = IMG_DUMMY;
  	}

  	this.sendFoto(this.autoparte.id);

  }

  uploadPhoto(){
    let opciones: ImagePickerOptions = {
      maximumImagesCount:1,
      quality: 50,
      outputType: 1
    };

    if ( this.platform.is("cordova") ) {
      this.imagePicker.getPictures(opciones).then((results) => {
        for( let imgPicker of results ){
          this.img = imgPicker;
        }
      }, (err) => { 
        console.error( "Error en seleccion" + JSON.stringify( err ) );
      });
    }else{
      this.img = IMG_DUMMY;
    }

    this.sendFoto(this.autoparte.id);

  }

  sendFoto(idAutoparte){
  	if (this.img.length == 0) {
  		console.log("No hay foto para enviar");
  		return;
  	}

  	this.loader.present();
  	this.autopartesProvider.setFotos( idAutoparte, this.img ).subscribe( data => {
  		this.closeLoader();
  		if (data.status.code == 'OK') {
  			this.img = "";
  			this.list_imagenes.push( data.dto );
  			this.list_imagenes.slice(0);
  		}else{
  			this.utilsProvider.presentAlert("Error", data.status.message);
  		}
  	}, error => {
  		this.loader.dismiss();
  	});

  }

  eliminarFoto( idFoto:string, idx:number ){
  	console.log( idFoto );

    this.loader.present();
    this.autopartesProvider.eliminarFoto( idFoto ).subscribe( data => {
      this.closeLoader();

      if (data.status.code == 'OK') {
        this.list_imagenes.splice( idx, 1 ); 
      }

    }, error => {
      this.closeLoader();
    });
  }


  closeLoader(){
  	this.loader.dismiss();
  	this.loader = this.loadingCtrl.create({
	      content: "Please wait...",
	      duration: 10000
	    });
  }

  finalizar(){
  	this.navCtrl.setRoot( HomePage );
  }

}
