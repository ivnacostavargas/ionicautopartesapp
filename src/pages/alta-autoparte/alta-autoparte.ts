import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

// Provider / Servicios
import { CategoriasProvider } from "../../providers/categorias/categorias";
import { UtilsProvider } from "../../providers/utils/utils";
import { AutopartesProvider } from "../../providers/autopartes/autopartes";

// Interfaces 
import { Autoparte } from "../../interfaces/Autoparte.interface";

// Paginas 
import { GaleriaAltaPage } from "../index.paginas";

@Component({
  selector: 'page-alta-autoparte',
  templateUrl: 'alta-autoparte.html',
})
export class AltaAutopartePage {

  categorias_list:any[] = [];
  list_year:number[] = [];

  autoparte:Autoparte = {
                      id: 0,
                      codigo_parte:"",
                      titulo:"",
                      estado:"",
                      precio:"",
                      nota:"",
                      year_inicio:new Date().getFullYear(),
                      year_fin:new Date().getFullYear(),
                      marca:"",
                      modelo:"",
                      frente:"",
                      lado:"",
                      foto_portada:"",
                      status:"",
                      categoria:"",
                      fecha_registro:"",
                      fotos:null
                    };

  loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });

  constructor(public navCtrl: NavController, 
    private categoriaProvider: CategoriasProvider,
    public loadingCtrl: LoadingController,
    public autoparteProvider: AutopartesProvider,
    public utils: UtilsProvider,
    public navParams: NavParams) {
    this.listYear();
    this.getCategorias();
  }

  listYear(){
    let fecha = new Date();
    let year_actual = fecha.getFullYear();

    for (var i = year_actual; i >= year_actual - 50; i--) {
      this.list_year.push( i );
    }
  }

  getCategorias(){
    this.loader.present();
    this.categoriaProvider.getCategorias().subscribe(data => {
      this.controlProgres();
      if (data.status.code == 'OK') {
        this.categorias_list = data.dto.slice(0);
      }
    }, error => {
      console.error(error);
    });
  }

  altaAutoparte(){
    // if (this.autoparte.codigo_parte == "") {
    //    this.utils.presentAlert("Aviso", "Debe de ingresar el codigo de la autoparte");
    //   return; 
    // }
    // if (this.autoparte.titulo == "") {
    //   this.utils.presentAlert("Aviso", "Debe de ingresar el nombre de la autoparte");
    //   return;
    // }
    this.loader.present();
    this.autoparteProvider.altaAutoparte( this.autoparte ).subscribe( data =>{
      this.controlProgres();
      if (data != null) {
        if (data.status.code == "OK") {
          console.log( JSON.stringify( data ) );
          this.navCtrl.push( GaleriaAltaPage, { 'idAutoparte' : data.dto.id } );
        }else{
          this.utils.presentAlert("Error", data.status.message );
        }
      }else{
        this.utils.presentAlert("Error", "No es posible realizar esta operación, intente nuevamente");
      }

    }, error =>{
      this.utils.presentAlert("Error", "No es posible realizar esta operación revice se conexion a internet, intente nuevamente");
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
