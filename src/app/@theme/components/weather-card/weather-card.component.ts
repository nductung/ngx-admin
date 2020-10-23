import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../../../services/weather.service';

@Component({
  selector: 'ngx-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit {
  @Input() cityName: string;
  state: any;
  temp: any;
  maxTemp: any;
  minTemp: any;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.getCurrentWeather();
    this.getForecast();
  }

  getCurrentWeather() {
    this.weatherService.getCurrentWeather(this.cityName).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(payload.main.temp);
    });
  }

  getForecast() {
    this.weatherService.getForecast(this.cityName).subscribe((payload: any) => {
      payload = payload.list;
      this.maxTemp = Math.round(payload[0].main.temp);
      this.minTemp = Math.round(payload[0].main.temp);
      for (const res of payload) {
        if (new Date().toLocaleDateString('en-GB') === new Date(res.dt_txt).toLocaleDateString('en-GB')) {
          this.maxTemp = res.main.temp > this.maxTemp ? Math.round(res.main.temp) : this.maxTemp;
          this.minTemp = res.main.temp < this.minTemp ? Math.round(res.main.temp) : this.minTemp;
        }
      }
    });
  }

  openDetails() {

  }

}
