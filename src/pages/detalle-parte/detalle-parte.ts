import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

// Interfaces 
import { Autoparte } from "../../interfaces/Autoparte.interface";

// Constantes / Data
import { URL_IMG, URL_DETALLE } from "../data/data.constantes";

// Plugins 
import { SocialSharing } from '@ionic-native/social-sharing';

// Paginas
import { ImageViewerPage,
         EditAutopartePage,
         HomePage
         } from "../index.paginas";

// Providers / Servicios
import { UtilsProvider } from "../../providers/utils/utils";
import { AutopartesProvider } from "../../providers/autopartes/autopartes";

@Component({
  selector: 'page-detalle-parte',
  templateUrl: 'detalle-parte.html',
})
export class DetallePartePage {

  URL_DETALLE:string = URL_DETALLE;
  URL_IMG:string = URL_IMG;
  autoparte:Autoparte;
  showControls: boolean = true;
  scale: number = 1;
  loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });

  constructor(public navCtrl: NavController, 
    private alertCtrl: AlertController,
  	public navParams: NavParams,
    private utils: UtilsProvider,
    public loadingCtrl: LoadingController,
    private socialSharing: SocialSharing,
    private autoparteProvider: AutopartesProvider) {
  	this.autoparte = this.navParams.get('autoparte');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePartePage');
  }

  imageViewer( img:any ){
    console.log( img );
    this.navCtrl.push( ImageViewerPage, { "img" : img } );
  }

  cambiarStatus(){
    let msj = '¿Estas seguro que deseas vender la autoparte?';
    let status = 'Vendido';

    if (this.autoparte.status == "Vendido") {
      msj = '¿Estas seguro que deseas regresar la autoparte?';
      status = 'Activo';
    }

    let confirm = this.alertCtrl.create({
        title: 'Aviso',
        message: msj,
        buttons: [
          {
            text: 'CANCELAR',
            handler: () => {
              console.log("Click en cancelar");
            }
          },
          {
            text: 'ACEPTAR',
            handler: () => {
              
              this.loader.present();
              this.autoparteProvider.actualizaEstatus(this.autoparte.id, status).subscribe(
                  data => {
                    this.controlProgres();
                    if (data != null) {
                      if (data.status.code == 'OK') {
                        console.log("La autoparte se actualizo correctamente");
                        this.autoparte.status = status;
                      }
                    }
                  }, error => {
                    this.controlProgres();
                  }
                );
            }
          }
        ]
      });

      confirm.present();
  }

  compilemsg():string{
    var msg = this.autoparte.titulo + " " + this.URL_DETALLE + this.autoparte.id;
    return msg.concat(" \n Enviado desde App Autopartes!");
  }

  regularShare(){
    let msg = this.compilemsg();
    
    console.log(msg);
    this.socialSharing.share(msg).then(()=>{
      console.log("Se compartio exitosamente");
    }).catch(()=>{
      console.log("Ocurrio un error al compartir");
    });
  }

  eliminarAutoparte(){
    this.loader.present();
    this.autoparteProvider.eliminarAutoparte( this.autoparte.id ).subscribe(
        data => {
          this.controlProgres();
          if ( data != null ) {
             if (data.status.code == 'OK') {
                this.navCtrl.setRoot( HomePage );
              }else {
                this.utils.presentAlert("Error", data.status.message );
              }
          }
        }, error => {
          this.controlProgres();
          this.utils.presentAlert("Error", "No es posible realizar esta operación, intente nuevamente.");
        }
      );
  }

  editar(){
    console.log("Editar ...");
    this.navCtrl.push( EditAutopartePage, { 'autoparte': this.autoparte } );
  }

  controlProgres(){
    this.loader.dismiss();
    this.loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 10000
      });
  }

}
