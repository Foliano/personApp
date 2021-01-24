import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { EventsService } from 'src/app/services/events-service/events.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {

  public today = moment(new Date()).toISOString();

  public edit = false;

  public event = {
    id: null,
    title: '',
    eventKind: null,
    allDay: true,
    startTime: moment(new Date()).toISOString(),
    endTime: moment(new Date(new Date().setHours(new Date().getHours() + 1))).toISOString(),
  }

  public kinds = [];

  constructor(
    private eventsService: EventsService,
    private modalCtrl: ModalController,
    private utilsService: UtilsService,
    private navParams: NavParams,
  ) {
    this.manageId();
  }
  
  private async manageId() {
    const id = this.navParams.get('id');
    if (id) {
      const ev = await this.eventsService.getEventById(id);
      if(ev) {
        this.event = ev;
        this.edit = true;
        return;
      }
    }
    this.event.id = this.eventsService.createId();
  }

  ngOnInit() {
    this.kinds = this.eventsService.getKinds;
  }
  
  public async saveEvent(): Promise<void> {
    const ev = { ...this.event };
    (ev.endTime as any) = new Date(ev.endTime);
    (ev.startTime as any) = new Date(ev.startTime);
    if(this.edit) {
      await this.eventsService.updateEvent(ev);
    } else {
      await this.eventsService.addEvent(ev);
    }
    this.utilsService.presentAlert({
      message: `Wydarzenie zostało ${this.edit ? 'edytowane' : 'dodane'}!`
    })
    this.dismiss();
  }

  public dismiss() {
    this.modalCtrl.dismiss();
  }

}
