import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { BusService } from '../bus.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import  FileSaver from 'file-saver';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  displayedColumns: string[] = [
    'id', 
    'driverName', 
    'driverPhoneNumber', 
    'busStopStation', 
    'carNumber', 
    'busCapacity', 
    'carModel', 
    'busLineStops', 
    'busType',
    'Actions'
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(private busService: BusService, private router: Router,private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadBuses();
  }

  loadBuses(): void {
    this.busService.getBuses().subscribe((data) => {
      console.log(data); 
      this.dataSource.data = data;
    });
  }

  deleteBus(id: number): void {
    this.busService.deleteBus(id).subscribe(() => {
      this.loadBuses();
    });
  }

  editBus(id: number): void {
    this.router.navigate(['/buses/edit', id]);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/buses/details', id]);
  }

  addBus(): void {
    this.router.navigate(['/buses/add']);
  }
  downloadTemplate(): void {
    const link = document.createElement('a');
    link.href = 'assets/BusTemplate.xlsx';
    link.download = 'BusTemplate.xlsx';
    link.click();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http.post('your-api-url/upload-template', formData)
        .subscribe(response => {
          alert('File uploaded and processed successfully.');
        }, error => {
          alert('File upload failed.');
        });
    }
  }

  uploadTemplate(): void {
    this.fileInput.nativeElement.click();
  }
  
}
