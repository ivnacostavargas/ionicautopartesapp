import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController, AlertController } from 'ionic-angular';

// Provaider / Servicio
import { AutopartesProvider } from "../../providers/autopartes/autopartes";
import { CategoriasProvider } from "../../providers/categorias/categorias"

// Interfaces 
import { Autoparte } from "../../interfaces/Autoparte.interface";

// Constantes / Data
import { URL_IMG } from "../data/data.constantes";

// Paginas
import { DetallePartePage, AltaAutopartePage } from "../index.paginas";
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  URL_IMG:string = URL_IMG;

  categoria:string;
  list_categorias:any;
  list_autopartes:Autoparte[];
  data_search:any = {
    search : "",
    categoria : "",
    rows : "10",
    paginacion : "0"
  };
  tmp_foto:any = "assets/imgs/dummy-image.jpg";

  constructor(public navCtrl: NavController,
  			private menuCtrl: MenuController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private categoriaProvider: CategoriasProvider,
        public autopartesProvider: AutopartesProvider) {
  	this.menuCtrl.enable(true);
    this.getAutopartes();
    this.getCategorias();
  }

  loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });

  getAutopartes(bandera:boolean = false){
    this.loader.present();

    this.autopartesProvider.getAutopartes( this.data_search ).subscribe( data => {
      this.controlProgres();
      if (data.status.code == "OK") {
        if (!bandera) {
          this.list_autopartes = data.dto.autopartes.slice(0);
        }else{
          for (var i = 0; i < data.dto.autopartes.length; i++) {
             this.list_autopartes.push(data.dto.autopartes[i]); 
          }
          
          this.list_autopartes.slice(0);
        }
        if (data.dto.autopartes.length > 0) {
          this.data_search.paginacion = data.dto.paginacion;
        }
      }
      
    }, error => {} );
  }

  getCategorias(){
    this.categoriaProvider.getCategorias().subscribe(data => {
      console.log(data);
      if (data.status.code == 'OK') {
        this.list_categorias = data.dto.slice(0);
      }
    }, error => {
      console.error(error);
    });
  }

  detalleAutoparte( autoparte:Autoparte ){
  	this.navCtrl.push( DetallePartePage, { 'autoparte' : autoparte } );
  }

  addAutoparte(){
    this.navCtrl.push( AltaAutopartePage );
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      inputs: [
        {
          name: 'search',
          placeholder: 'Buscar'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            console.log('Saved clicked ' + data.search);
            this.data_search.search = data.search;
            this.data_search.paginacion = 0;
            this.getAutopartes();
          }
        }
      ]
    });
    prompt.present();
  }

  searchCategoria( categoria:string ){
    console.log("Buscar por categoria : " + categoria);
    this.data_search.categoria = categoria;
    this.data_search.paginacion = 0;

    if (categoria == 'NC') {
      this.data_search.categoria = '';
    }

    this.getAutopartes();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    try{
      setTimeout(() => {
        this.getAutopartes(true);
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 1000);
    }catch(Exception){
      console.error(Exception);
    }
    
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.data_search.paginacion = "0";
      this.getAutopartes();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  controlProgres(){
    this.loader.dismiss();
    this.loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 10000
      });
  }

}
