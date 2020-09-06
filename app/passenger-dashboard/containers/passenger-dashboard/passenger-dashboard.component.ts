import { Component, OnInit } from "@angular/core";
import { Passenger } from "../../models/Passenger.interface";
import { PassengerDashboardService } from "../../passenger-dashboard.service";

@Component({
  selector: "passenger-dashboard",
  styleUrls: ["passenger-dashboard.component.scss"],
  template: `
    <div>
      <passenger-count
        [items]="passengers">
      </passenger-count>

      <passenger-detail
        *ngFor="let passenger of passengers;"
        [detail]="passenger"
        (remove)="handleRemove($event)"
        (edit)="handleEdit($event)">
      </passenger-detail>
    </div>
  `,
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor(private passengerService: PassengerDashboardService) {}

  ngOnInit(): void {
    this.passengers = this.passengerService.getPassengers();
  }

  handleEdit(event: Passenger): void {
    this.passengers = this.passengers.map((passenger: Passenger) => {
      if (passenger.id === event.id) {
        passenger = Object.assign({}, passenger, event);
      }

      return passenger;
    });
  }

  handleRemove(event: Passenger): void {
    this.passengers = this.passengers.filter((passenger: Passenger) => {
      return passenger.id !== event.id;
    })
  }
}

