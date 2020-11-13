import { Injectable } from '@angular/core';
import { IAnimal } from '../interfaces/ianimal';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import { PusherService } from './pusher.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AnimalService {
private _endPoint = 'http://localhost:8080/animals'; // normally you use environment.ts
private _channel: any;

constructor(private _http: HttpClient, private _pusherService: PusherService) {
  this._channel = this._pusherService.getPusher().subscribe('animal');
}

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('Test:P4ssword')
  })
};

/**
 * @return animal's channel for the different event available under animal
 */
getChannel () {
  return this._channel;
}

list (): Observable<IAnimal[]> {
  return this._http.get(this._endPoint + "/filter", this.httpOptions)
  .map(res => <IAnimal[]> res);
}

/**
 * Create new animal
 * @param param
 * @return Observable<IAnimal> with the key
 */
create(param: IAnimal): Observable<IAnimal> {
  return this._http.post(this._endPoint, param, this.httpOptions)
  .map(res => <IAnimal> res);
}

/**
 * Remove an animal
 * @param animal to remove
 * @return Observable<IAnimal> the animal just removed
 */
delete(animal: IAnimal): Observable<IAnimal> {
  return this._http.delete(`${this._endPoint}/${animal.key}`, this.httpOptions)
  .mapTo(animal);
}

}
