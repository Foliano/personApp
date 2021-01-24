import { Component } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';
import { filter } from 'rxjs/operators';
import { AddEventComponent } from './components/add-event/add-event.component';
import { PersonService } from './services/person-service/person.service';
import { EventsService } from './services/events-service/events.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public hideMenu = false;

  private stylesForSex;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Dodaj wydarzenie',
      icon: 'add'
    },
  ];
  public labels = [];

  public person = {
    name: '',
    sex: '',
    photo: {
      data: null,
      format: null
    },
    birthday: ''
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storageService: StorageService,
    private modalCtrl: ModalController,
    private personService: PersonService,
    private eventsService: EventsService,
  ) {
    this.initializeApp();
    this.stylesForSex = this.personService.getStylesForSex;
  }
  
  initializeApp() {
    this.platform.ready().then(async () => {
      const hasConfiguration = await this.storageService.getItem('hasConfiguration');
      if(!hasConfiguration) {
        this.router.navigate(['/configuration'], { replaceUrl: true });
      }
      this.router.events.pipe(filter(ev => {
        return ev instanceof NavigationEnd
      })).subscribe((event: NavigationEnd) => {
        this.hideMenu = (event.url === '/configuration');
        if(!this.hideMenu) {
          this.initView();
        }
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async initView() {
    const person = await this.storageService.getItem('person');
    if(person) {
      this.person = person;
      this.stylesForSex[person.sex].forEach(style => {
        document.documentElement.style.setProperty(style.key, style.value);
      });
    }
    this.labels = this.eventsService.getKinds;
    this.eventsService.getEvents();
  }

  public async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddEventComponent,
      componentProps: { },
    });

    await modal.present();
    await modal.onWillDismiss();
  }
}
