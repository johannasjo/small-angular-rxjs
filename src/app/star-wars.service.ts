import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StarwarsService {
  baseUrl = `https://swapi.dev/api`;
  constructor(private http: HttpClient) {
    this.fetchCharacters();
  }

  // never expose behaviourSubject outside of service, as it gives access to
  // emit data through the service
  private _characters$: BehaviorSubject<any> = new BehaviorSubject([]);
  public characters$: Observable<any> = this._characters$.asObservable();
  public charactersWithVehicles$: Observable<any> = this.characters$.pipe(
    map((characters) => {
      return characters.filter((character) => character.vehicles.length);
    })
  );

  fetchCharacters() {
    this.http
      .get(`${this.baseUrl}/people/`)
      .pipe(map((response: any) => response.results))
      .subscribe((characters) => {
        this._characters$.next(characters);
      });
  }

  // not really neccessary if I have public observables
  public getCharacters(): Observable<any> {
    return this.characters$;
  }
}
