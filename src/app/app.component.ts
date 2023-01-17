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
  public characters$: Observable<any> = this.starWarsService.characters$;
  public charactersWithVehicles$: Observable<any> =
    this.starWarsService.charactersWithVehicles$;
}
