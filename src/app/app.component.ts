import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { 
  LoginPage,
  CategoriasPage,
  UsuariosPage
 } from '../pages/index.paginas'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  categorias:any = CategoriasPage;
  home:any = HomePage;
  usuarios:any = UsuariosPage;
  

  constructor(public platform: Platform, statusBar: StatusBar,
   public splashScreen: SplashScreen,
   private menuCtrl: MenuController,
   private storage: Storage) {
    // platform.ready().then(() => {
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
    this.validarSession();
  }

  validarSession(){
    this.storage.get('Usuario').then((val) => {
      if (val == null) {
        this.rootPage = LoginPage;
      }else{
        console.log("Valor" + val);
        this.rootPage = HomePage;
      }
    });
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  } 

  abrirPagina( pagina:any ){
      this.rootPage = pagina;
      this.menuCtrl.close();
  }

  logout(){
    console.log("Saliendo...");
    this.storage.set('Usuario',null);
    this.validarSession();
  }
}

