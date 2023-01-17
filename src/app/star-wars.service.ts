import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StarwarsService {
  baseUrl = `https://swapi.dev/api`;
  constructor(private http: HttpClient) {
    this.fetchCharacters();
    this.fetchPlanets();
  }

  // never expose behaviourSubject outside of service, as it gives access to
  // emit data through the service
  private _characters$: BehaviorSubject<any> = new BehaviorSubject([]);
  private _planets$: BehaviorSubject<any> = new BehaviorSubject([]);

  public characters$: Observable<any> = this._characters$.asObservable();
  public charactersWithVehicles$: Observable<any> = this.characters$.pipe(
    map((characters) => {
      return characters.filter((character) => character.vehicles.length);
    })
  );
  public planets$: Observable<any> = this._planets$.asObservable();

  fetchCharacters() {
    this.http
      .get(`${this.baseUrl}/people/`)
      .pipe(map((response: any) => response.results))
      .subscribe((characters) => {
        this._characters$.next(characters);
      });
  }

  fetchPlanets() {
    this.http
      .get(`${this.baseUrl}/planets`)
      .pipe(
        tap(console.log),
        map((response) => response.results),
        tap((planets) => console.log('planets', planets))
      )
      .subscribe();
  }

  // not really neccessary if I have public observables
  public getCharacters(): Observable<any> {
    return this.characters$;
  }
}
