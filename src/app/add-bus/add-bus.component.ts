
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent {
  busForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private busService: BusService,
    private router: Router
  ) {
    this.busForm = this.fb.group({
      DriverName: ['', Validators.required],
      DriverPhoneNumber: ['', Validators.required],
      BusStopStation: ['', Validators.required],
      CarNumber: [null],
      BusCapacity: [null],
      CarModel: [''],
      BusLineStops: [''],
      BusType: [''],
      IsDeleted: [false]
    });
  }

  onSubmit(): void {
    if (this.busForm.valid) {
      this.busService.addBus(this.busForm.value).subscribe(() => {
        this.router.navigate(['/buses']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/buses']);
  }
}
