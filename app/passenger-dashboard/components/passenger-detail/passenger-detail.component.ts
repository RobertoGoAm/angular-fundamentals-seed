import { Component, Input, Output, OnChanges, SimpleChanges, OnInit } from "@angular/core";
import { Passenger } from "../../models/Passenger.interface";
import { EventEmitter } from "@angular/common/src/facade/async";

@Component({
  selector: "passenger-detail",
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <div *ngIf="editing">
        <input
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name>
      </div>

      <div *ngIf="!editing">
        {{ detail.fullname }}
      </div>

      <div class="date">
        Check in date:
        {{ detail.checkInDate ? (detail.checkInDate | date: "yMMMMd" | uppercase) : "Not checked in" }}
      </div>

      <div class="children">
        Children: {{ detail.children?.length || 0 }}
      </div>

      <button (click)="toggleEdit()">
        {{ editing ? 'Done' : 'Edit' }}
      </button>

      <button (click)="onRemove()">
        Remove
      </button>
    </div>
  `,
})
export class PassengerDetailComponent implements OnChanges, OnInit {
  @Input() detail: Passenger;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  editing: boolean = false;

  constructor() {}

  ngOnChanges(changes: any): void {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
    }

    console.log('ngOnChanges');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  onNameChange(value: string): void {
    this.detail.fullname = value;
  }

  toggleEdit(): void {
    if (this.editing) {
      this.edit.emit(this.detail);
    }

    this.editing = !this.editing;
  }

  onRemove(): void {
    this.remove.emit(this.detail);
  }
}
