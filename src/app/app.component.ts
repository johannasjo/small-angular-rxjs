import { Component, VERSION } from '@angular/core';
import { StarwarsService } from './star-wars.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private starWarsService: StarwarsService) {}

  // basic observable, subscription and observer

  public newObservable$ = new Observable<string>((subscriber) => {
    console.log('Observable executed');
    subscriber.next('Alice');
    setTimeout(() => {
      subscriber.next('Charlie');
      setTimeout(() => {
        subscriber.error(new Error('Failure'));
      }, 3000);
    }, 1000);
    return () => {
      console.log('tear down');
    };
  }).subscribe({
    next: (value) => console.log(value),
    complete: () => console.log('completed'),
    error: (err) => console.log('error message is: ', err.message),
  });

  // star wars observables

  public characters$: Observable<any> = this.starWarsService.characters$;
  public charactersWithVehicles$: Observable<any> =
    this.starWarsService.charactersWithVehicles$;
  public planets$: Observable<any> = this.starWarsService.planets$;
}
