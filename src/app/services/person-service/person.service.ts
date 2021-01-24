import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private stylesForSex = {
    woman: [
      {
        key: '--ion-color-primary',
        value: '#c51162',
      },
      {
        key: '--ion-color-primary-rgb',
        value: '197,17,98',
      },
      {
        key: '--ion-color-primary-contrast',
        value: '#ffffff',
      },
      {
        key: '--ion-color-primary-contrast-rgb',
        value: '255,255,255',
      },
      {
        key: '--ion-color-primary-shade',
        value: '#ad0f56',
      },
      {
        key: '--ion-color-primary-tint',
        value: '#cb2972',
      },
    ],
    man: [
      {
        key: '--ion-color-primary',
        value: '#3880ff',
      },
      {
        key: '--ion-color-primary-rgb',
        value: '56, 128, 255',
      },
      {
        key: '--ion-color-primary-contrast',
        value: '#ffffff',
      },
      {
        key: '--ion-color-primary-contrast-rgb',
        value: '255, 255, 255',
      },
      {
        key: '--ion-color-primary-shade',
        value: '#3171e0',
      },
      {
        key: '--ion-color-primary-tint',
        value: '#4c8dff',
      },
    ],
  }


  constructor() { }


  public get getStylesForSex() {
    return this.stylesForSex;
  }
}
