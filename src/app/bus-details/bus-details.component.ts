
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-bus-details',
  templateUrl: './bus-details.component.html',
  styleUrls: ['./bus-details.component.css']
})
export class BusDetailsComponent implements OnInit {
  bus: any;
  busId: number;

  constructor(
    private busService: BusService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.busId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.busService.getBus(this.busId).subscribe((data) => {
      this.bus = data.data;
    });
  }

  onBack(): void {
    this.router.navigate(['/buses']);
  }
}
