import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, Navbar } from 'ionic-angular';

// Constantes 
import { IMG_DUMMY, URL_IMG } from "../data/data.constantes";

// Providers / Servicios 
import { AutopartesProvider } from "../../providers/autopartes/autopartes";
import { UtilsProvider } from "../../providers/utils/utils"; 

// Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

// Paginas 
import { HomePage } from "../index.paginas";

@Component({
  selector: 'page-galeria-alta', 
  templateUrl: 'galeria-alta.html',
})
export class GaleriaAltaPage {

	@ViewChild('navbar') navBar: Navbar;

	img:string = "";
	url_img:string = URL_IMG;
	list_imagenes:any[] = [];
	loader = this.loadingCtrl.create({
	      content: "Please wait...",
	      duration: 10000
	    });

  constructor(public navCtrl: NavController,
  			private autopartesProvider: AutopartesProvider,
  			private utilsProvider: UtilsProvider,
  			public loadingCtrl: LoadingController,
        private imagePicker: ImagePicker,
		   public navParams: NavParams,
		   private platform: Platform,
		   private camera: Camera) {}

  
  takePhoto(){
  	const options: CameraOptions = {
  	  quality: 50,
  	  destinationType: this.camera.DestinationType.DATA_URL,
  	  encodingType: this.camera.EncodingType.JPEG,
  	  mediaType: this.camera.MediaType.PICTURE
  	}

  	if ( this.platform.is("cordova") ) {
      this.loader.present();
  		this.camera.getPicture(options).then((imageData) => {
        this.closeLoader();
  		 this.img = imageData;
  		}, (err) => {
  		 this.closeLoader();
        this.utilsProvider.presentAlert("Error", "Error al tomar la foto");
  		});
  	}else{
  		this.img = IMG_DUMMY;
  	}

  	this.sendFoto(this.navParams.get("idAutoparte"));

  }

  uploadPhoto(){
    let opciones: ImagePickerOptions = {
      maximumImagesCount:1,
      quality: 50,
      outputType: 1
    };

    if ( this.platform.is("cordova") ) {
      this.loader.present();
      this.imagePicker.getPictures(opciones).then((results) => {
        this.closeLoader();
        for( let imgPicker of results ){
          this.img = imgPicker;
        }
      }, (err) => { 
        console.error( "Error en seleccion" + JSON.stringify( err ) );
        this.closeLoader();
        this.utilsProvider.presentAlert("Error", "Error al tomar la foto");
      });
    }else{
      this.img = IMG_DUMMY;
    }

    this.sendFoto(this.navParams.get("idAutoparte"));

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
  			this.list_imagenes.push( data.dto );
  			this.list_imagenes.slice(0);
  		}else{
  			this.utilsProvider.presentAlert("Error", data.status.message);
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

  ionViewDidEnter() {
    this.navBar.backButtonClick = () => {
      // Dentro de esta funcion se pondra lo que se desee
      // hacer cuando se precione el boton de back en este caso
      // Regresa a la raiz que es la ventana del mapa donde empezo
      console.log("PRESIONO EL BOTON BACK...")
      this.navCtrl.popToRoot();
    }
  };

  finalizar(){
    this.navCtrl.setRoot( HomePage );
  }

}
