import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private events$ = new BehaviorSubject([]);
  private events = [];

  private kinds = [
    {
      key: 0,
      value: 'Rodzina',
      color: 'primary',
    },
    {
      key: 1,
      value: 'Lekarz',
      color: 'medium',
    },
    {
      key: 2,
      value: 'Spanie',
      color: 'warning',
    },
    {
      key: 3,
      value: 'Karmienie',
      color: 'success',
    },
    {
      key: 4,
      value: 'Zabawa',
      color: 'tertiary',
    },
  ];

  constructor(
    private storageService: StorageService
  ) {}

  public async getEvents() {
    const events = await this.storageService.getItem('events');
    if(events) {
      events.map((event) => {
        if(event.startTime) {
          event.startTime = new Date(event.startTime);
          event.endTime = new Date(event.endTime);
        }
        return event;
      })
      this.events = [...events];
    }
    this.events$.next(this.events);
  }

  public get listenEvents() {
    return this.events$;
  }

  public async getEventById(id: string): Promise<any> {
    const event = this.events.find((event) => event.id === id);
    return event || null;
  }

  public async saveEvents(): Promise<void> {
    await this.storageService.setItem({ key: 'events', value: this.events});
    this.events$.next(this.events);
  }

  public async addEvent(event): Promise<void> {
    this.events.push({...event});
    await this.saveEvents();
  }
  
  public async updateEvent(eventUpd) {
    const eventIndex = this.events.findIndex((event) => event.id === eventUpd.id);
    this.events[eventIndex] = { ...eventUpd };
    await this.saveEvents();
  }

  public createId(): string {
    return String(new Date().getTime() * Math.floor(Math.random() * 1000));
  }

  createRandomEvents() {
    let events = [];
    for (let i = 0; i < 50; i += 1) {
      const date = new Date();
      const eventType = Math.floor(Math.random() * 2);
      const eventKind = Math.floor(Math.random() * 5);
      const startDay = Math.floor(Math.random() * 90) - 45;
      let endDay = Math.floor(Math.random() * 2) + startDay;
      let startTime;
      let endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'Cały dzień - ' + i,
          startTime,
          endTime,
          allDay: true,
          eventKind,
          id: this.createId()
        });
      } else {
        const startMinute = Math.floor(Math.random() * 24 * 60);
        const endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Event - ' + i,
          startTime,
          endTime,
          allDay: false,
          eventKind,
          id: this.createId()
        });
      }
    }
    this.events = events;
    this.events$.next(this.events);
  }

  public get getKinds() {
    return this.kinds;
  }
}
