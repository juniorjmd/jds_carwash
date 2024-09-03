import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class configService {
  private configUrl = 'assets/config.json';
  public url: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<any> {
    return this.http.get(this.configUrl).pipe(
      map((config: any) => {
        this.url = this.buildUrls(config.baseURL, config.endpoints);
        return this.url;
      })
    );
  }

  private buildUrls(baseURL: string, endpoints: any): any {
    const urls: any = {};
    for (const key in endpoints) {
      if (endpoints.hasOwnProperty(key)) {
        urls[key] = baseURL + endpoints[key];
      }
    }
    return urls;
  }
}
 
