import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select2Service } from './services/select2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  countries$?: Observable<any>;
  test: any[] = [];

  constructor(private select2Service: Select2Service) {

  }

  ngOnInit(): void {
    this.countries$ = this.select2Service.getCountries();
  }

  onTest() {
    console.log(this.test)
  }

}
