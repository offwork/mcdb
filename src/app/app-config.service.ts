import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private config: Object;
  private env: Object;

  constructor(private http: HttpClient) {}

  /**
   * Loads the environment config file first. Reads the environment
   * variable from the file and based on that loads
   * the appropriate configuration file - development or production
   *
   * @memberof AppConfigService
   */
  public load() {
    return new Promise((resolve, reject) => {
      this.http.get('/config/env.json').subscribe(env_ata => {
        this.env = env_ata;
        this.http
          .get(`/config/${env_ata['env']}.json`)
          .pipe(
            tap(obj => console.log('Eyvah Eyvah!!! ', obj)),
            catchError((err: any) => {
              return throwError(`HATA VAR: ${err.json().error}` || 'Server error');
            })
          )
          .subscribe(data => {
            this.config = data;
            resolve(true);
          });
      });
    });
  }

  /**
   * Returns environment variable based on given key
   *
   * @param key
   */
  public getEnv(key: any) {
    return this.env[key];
  }

  /**
   * Returns configuration value based on given key
   *
   * @param key
   */
  public get(key: any) {
    return this.config[key];
  }
}
