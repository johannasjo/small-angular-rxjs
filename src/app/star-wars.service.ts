import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap, switchMap } from 'rxjs';

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
      console.log('charchters', characters);
      return characters.filter((character) => character.vehicles.length);
    })
  );
  public planets$: Observable<any> = this._planets$.asObservable();
  public planetsWithCharacters$: Observable<any> = this.planets$.pipe(
    map((planets) => {
      console.log('planets res', planets);
      return planets.filter((planet) => planet.residents.length);
    }),
    tap((planets) => console.log('planets with res', planets))
  );

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
        map((response: any) => response.results),
        tap((planets) => console.log('planets', planets))
      )
      .subscribe((planets) => {
        this._planets$.next(planets);
      });
  }

  // not really neccessary if I have public observables
  public getCharacters(): Observable<any> {
    return this.characters$;
  }
}
