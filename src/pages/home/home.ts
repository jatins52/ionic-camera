import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public imageArray: any[] = []

  constructor(public navCtrl: NavController, private camera: Camera, private filePath: FilePath) { }

  public getPicture(type) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type == 'camera' ? 1 : 0
    }
    return new Promise((resolve, reject) => {
      this.camera.getPicture(options).then((image) => {

        this.filePath.resolveNativePath(image)
          .then(filePath => {
            this.imageArray.push(filePath);
            resolve();
          })
          .catch(err => console.log(err));
      }, (err) => {
        reject()
      });
    });
  }

}
