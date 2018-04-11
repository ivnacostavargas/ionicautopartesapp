import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

// Plugins
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Camera } from '@ionic-native/camera';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZoomAreaModule } from 'ionic2-zoom-area';
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
// Paginas
import { HomePage } from '../pages/home/home';
import { 
  LoginPage,
  CategoriasPage,
  UsuariosPage,
  CrearUsuarioPage,
  DetallePartePage,
  AltaAutopartePage,
  ModificaUsuarioPage,
  GaleriaAltaPage,
  ImageViewerPage,
  EditAutopartePage,
  GaleriaEditPage
 } from '../pages/index.paginas'

// Provider
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { UtilsProvider } from '../providers/utils/utils';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { AutopartesProvider } from '../providers/autopartes/autopartes';
  
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CategoriasPage,
    UsuariosPage,
    CrearUsuarioPage,
    DetallePartePage,
    AltaAutopartePage,
    ModificaUsuarioPage,
    GaleriaAltaPage,
    ImageViewerPage,
    EditAutopartePage,
    GaleriaEditPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicImageViewerModule,
    BrowserAnimationsModule,
    ZoomAreaModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
     name: '__mydb',
     driverOrder: ['indexeddb', 'sqlite', 'websql']
   })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CategoriasPage,
    UsuariosPage,
    CrearUsuarioPage,
    DetallePartePage,
    AltaAutopartePage,
    ModificaUsuarioPage,
    GaleriaAltaPage,
    ImageViewerPage,
    EditAutopartePage,
    GaleriaEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    ImagePicker,
    UsuariosProvider,
    UtilsProvider,
    CategoriasProvider,
    SocialSharing,
    AutopartesProvider
  ]
})
export class AppModule {}
