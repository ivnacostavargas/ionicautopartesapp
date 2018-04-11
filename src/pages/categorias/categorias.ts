import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

// Provider / Servicios
import { CategoriasProvider } from "../../providers/categorias/categorias";

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  categorias_list:any[] = [];

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
    private categoriaProvider: CategoriasProvider,
  	public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    this.getCategorias();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
  }

  getCategorias(){
    this.presentLoading(true);
    this.categoriaProvider.getCategorias().subscribe(data => {
      console.log(data);
      if (data.status.code == 'OK') {
        this.categorias_list = data.dto.slice(0);
        this.presentLoading(false);
      }
    }, error => {
      console.error(error);
    });
  }

  eliminar_categoria( categoria:any, idx:any ){
    console.log( categoria );

    this.categoriaProvider.deleteCategoria( categoria ).subscribe( data => {
      console.log(data);
      if (data.status.code == 'OK') {
        this.categorias_list.splice( idx, 1 );
      }
    }, error => {
      console.error(error);
    } );
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '',
      message: "Escribe el nombre de la categoria:",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Categoria'
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ACEPTAR',
          handler: data1 => {
            console.log('Saved clicked', data1);
            this.categoriaProvider.altaCategoria( data1 ).subscribe( data_provider => {
              console.log( data_provider );
              this.categorias_list.push( data_provider.dto );
              this.categorias_list.slice(0);
            }, error => {
              console.error(error);
            } )
          }
        }
      ]
    });
    prompt.present();
  }


  presentLoading(bandera:boolean) {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });

    if (bandera) {
      loader.present();
      console.log("Abrir loading...");
    }else{
      loader.dismiss();
    }
  }

}
