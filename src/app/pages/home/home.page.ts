import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddEventComponent } from 'src/app/components/add-event/add-event.component';
import { EventsService } from 'src/app/services/events-service/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  eventSource;
  viewTitle;

  public kinds = [];

  public calendar = {
    mode: 'month',
    locale: 'pl-PL',
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function(date:Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function(date:Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function(date:Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function(date:Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function(date:Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function(date:Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function(date:Date) {
        return 'testDH';
      },
      formatDayViewTitle: function(date:Date) {
        return 'testDT';
      }
    }
  };

  constructor(
    private eventsService: EventsService,
    private modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
    this.kinds = this.eventsService.getKinds;
    this.eventsService.listenEvents.subscribe((events) => {
      this.eventSource = events;
    })
  }

  public loadEvents(): void {
    this.eventsService.createRandomEvents();
  }

  public onViewTitleChanged(title): void {
    this.viewTitle = title;
  }

  public changeMode(mode: string): void {
    this.calendar.mode = mode;
  }

  public async openModal(id): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddEventComponent,
      componentProps: { id },
    });

    await modal.present();
    await modal.onWillDismiss();
  }
}
