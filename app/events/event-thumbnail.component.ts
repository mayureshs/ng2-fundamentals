import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'event-thumbnail',
  template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
      <h2>{{event?.name}}</h2>
      <div>Date: {{event?.date}}</div>
      <div [ngClass]= "getStartTimeClass()" [ngSwitch]="event?.time">
        Time: {{event?.time}}
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
        <span *ngSwitchDefault>(Normal Start)</span>
      </div>
      <div>Price: \${{event?.price}}</div>   

      <div *ngIf="event?.location">
        <span>Location: {{event.location.address}}</span>
        <span class="pad-left">
          {{event.location.city}}, {{event.location.country}} 
        </span>
      </div>

      <div *ngIf="event?.onlineUrl">
        Online URL:  {{event.onlineUrl}}
      </div>

      <button class="btn btn-primary hide" (click)="handleClickMe()">"Click Me</button> 
    </div>
    `,
  styles: [`
      .green { color: #003300 !important; }
      .bold { font-weight: bold; }
      .pad-left { margin-left: 10px; }
      .well div { color: #bbb }
      .thumbnail { min-height: 210px; }
    `]

})
export class EventThumbnailComponent implements OnInit {

  @Input() event: any;  //get input from parent

  @Output() eventClick = new EventEmitter();  //sent output to parent

  constructor() { }

  ngOnInit() { }

  getStartTimeClass() {
    // const isEarlyStart = this.event && this.event.time === '8:00 am';
    // return { green: isEarlyStart, bold: isEarlyStart };
    if (this.event && this.event.time === '8:00 am')
      return 'green bold';
    return '';
  }

  getStartTimeStyle(): any {
    if (this.event && this.event.time === '8:00 am')
      return { color: '#003300', 'font-weight': 'bold' };
    return {};
  }

  //hidden functionality
  handleClickMe() {
    console.log('clicked from child thumbnail!');
    this.eventClick.emit(this.event.name);
  }

  //hidden functionality
  someProperty: any = "some value set in child";

  logFoo() {
    console.log('foo from child');
  }
}