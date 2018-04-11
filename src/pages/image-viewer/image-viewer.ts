import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-image-viewer',
  templateUrl: 'image-viewer.html',
})
export class ImageViewerPage {
	showControls: boolean = true;
  	scale: number = 1;
	img:any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams) {
  	this.img = this.navParams.get("img");
  }

  afterZoomIn (event) {
    console.log('After ZoomIn Event: ', event);
  }

  afterZoomOut (event) {
    console.log('After ZoomOut Event: ', event);
  }

}
