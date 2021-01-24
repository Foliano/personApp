import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera/camera.service';
import { PersonService } from 'src/app/services/person-service/person.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  @ViewChild('form') form: NgForm;
  @ViewChild('slides') slides: IonSlides;

  public slideOpts = {
    initialSlide: 0,
    paginator: true,
    allowTouchMove: false,
  };

  public activeIndex = 0;

  private stylesForSex;

  public today = new Date();

  public person = {
    name: '',
    photo: {
      data: null,
      format: null
    },
    sex: 'man',
    birthday: new Date()
  }

  constructor(
    private storageService: StorageService,
    private router: Router,
    private personService: PersonService,
    private cameraService: CameraService,
  ) { }

  ngOnInit() {
    this.stylesForSex = this.personService.getStylesForSex;
  }

  public chooseSex(sex: string): void {
    this.person.sex = sex;
    this.stylesForSex[sex].forEach(style => {
      document.documentElement.style.setProperty(style.key, style.value);
    });
  }

  public slidePrev(): void {
    this.slides.slidePrev();
    this.activeIndex -= 1;
  }
  
  public slideNext(): void {
    this.slides.slideNext();
    this.activeIndex += 1;
  }

  public saveConfiguration(): void {
    this.storageService.setItem({ key: 'hasConfiguration', value: true });
    this.storageService.setItem({ key: 'person', value: this.person });
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  public async addPhoto(): Promise<void> {
    const cameraData = await this.cameraService.takePicture();
    const { base64String: data, format } = cameraData;
    if(data) {
      this.person.photo = {
        data,
        format
      }
    }
  }

}
