import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cities = ['Hanoi'];
  listCities = [];
  filteredOptions$: Observable<string[]>;
  @ViewChild('autoInput') input;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getJSON().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.listCities.push(data[i].name);
      }
    });
    this.filteredOptions$ = of(this.listCities);
  }

  addCity() {
    this.cities.push('Thanh Hoa');
  }

  public getJSON(): Observable<any> {
    return this.http.get('assets/data/current.city.list.min.json');
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listCities.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

}

