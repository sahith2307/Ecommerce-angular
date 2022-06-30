import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getData = () => {
    return this.http.get('http://xapi.ngminds.com/api/getAllProducts');
  };
  postData = (body: any) => {
    return this.http.post('http://xapi.ngminds.com/api/placeOrder', body);
  };
}
