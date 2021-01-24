import { Injectable } from '@angular/core';
import {
  Plugins,
  CameraResultType,
  CameraOptions,
  CameraPhoto
} from '@capacitor/core';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private defaultOptions = {
    quality: 90,
    allowEditing: false,
    promptLabelPhoto: 'Wybierz z albumu',
    resultType: CameraResultType.Base64
  };

  constructor() {}

  public async takePicture(
    options: CameraOptions = this.defaultOptions,
  ): Promise<CameraPhoto> {
    options = { ...this.defaultOptions, ...options };
    let image = await Camera.getPhoto(options);
    return image;
  }
}
