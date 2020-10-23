import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getCurrentWeather(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.apiKey}&units=metric`);
  }

  getForecast(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${environment.apiKey}&units=metric`);
  }

}
