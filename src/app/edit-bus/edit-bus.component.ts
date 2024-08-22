
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.css']
})
export class EditBusComponent implements OnInit {
  busForm: FormGroup;
  busId: number;

  constructor(
    private fb: FormBuilder,
    private busService: BusService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.busForm = this.fb.group({
      driverName: ['', Validators.required],
      driverPhoneNumber: ['', Validators.required],
      busStopStation: ['', Validators.required],
      carNumber: [null],
      busCapacity: [null],
      carModel: [''],
      busLineStops: [''],
      busType: [''],
      isDeleted: [false]
    });
    

    this.busId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.busService.getBus(this.busId).subscribe((bus) => {
      this.busForm.patchValue(bus.data);
    });
  }

  onSubmit(): void {
    if (this.busForm.valid) {
      this.busService.updateBus(this.busId, this.busForm.value).subscribe(() => {
        this.router.navigate(['/buses']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/buses']);
  }
}
