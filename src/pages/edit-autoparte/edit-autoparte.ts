import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

// Provider / Servicios
import { CategoriasProvider } from "../../providers/categorias/categorias";
import { AutopartesProvider } from "../../providers/autopartes/autopartes";
import { UtilsProvider } from "../../providers/utils/utils";

// Interfaces 
import { Autoparte } from "../../interfaces/Autoparte.interface";

// Paginas
import { GaleriaEditPage } from "../index.paginas";

@Component({
  selector: 'page-edit-autoparte',
  templateUrl: 'edit-autoparte.html',
})
export class EditAutopartePage {

  categorias_list:any[] = [];
  list_year:number[] = [];

  loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });

  autoparte:Autoparte;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private categoriaProvider: CategoriasProvider,
    public autoparteProvider: AutopartesProvider,
    public utils: UtilsProvider,
    public loadingCtrl: LoadingController) {
  	this.autoparte = this.navParams.get('autoparte');
    this.listYear();
    this.getCategorias();
  }

  getCategorias(){
    this.loader.present();
    this.categoriaProvider.getCategorias().subscribe(data => {
      this.controlProgres();
      if (data.status.code == 'OK') {
        this.categorias_list = data.dto.slice(0);
      }
    }, error => {
      this.controlProgres();
      console.error(error);
    });
  }

  actualizarAutoparte(){
    console.log("Actualizar la autoparte ...");
    this.loader.present();

    this.autoparteProvider.actualizarAutoparte( this.autoparte ).subscribe( data => {
      this.controlProgres();
      if (data != null) {
        if (data.status.code == "OK") {
          console.log( JSON.stringify( data ) );
          this.utils.presentAlert("Aviso", "Datos actualizados correctamente" );
        }else{
          this.utils.presentAlert("Error", data.status.message );
        }
      }else{
        this.utils.presentAlert("Error", "No es posible realizar esta operación, intente nuevamente");
      }
    }, error => {
      this.controlProgres();
      this.utils.presentAlert("Error", "No es posible realizar esta operación revice se conexion a internet, intente nuevamente");
    });
  }

  listYear(){
    let fecha = new Date();
    let year_actual = fecha.getFullYear();

    for (var i = year_actual; i >= year_actual - 50; i--) {
      this.list_year.push( i );
    }
  }

  irAGaleria(){
    this.navCtrl.push( GaleriaEditPage, { 'autoparte': this.autoparte } );
  }

  controlProgres(){
    this.loader.dismiss();
    this.loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 10000
      });
  }

}
