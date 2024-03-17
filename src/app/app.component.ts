import {Component, ElementRef, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { Title } from '@angular/platform-browser';
import {HeaderService} from "./services/header/header.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private getHeaderDetailsSubscriber! : Subscription;
  constructor(private titleService: Title, private headerService : HeaderService) {
  }

  /**
   * initialize component
   */
  ngOnInit(): void {
    this.getHeaderDetailsSubscriber = this.headerService.getHeaderDetails().subscribe(data => {
      this.updateTitle(data.title);
    });
  }

  /**
   * unsubscribe subscription before component destroyed
   */
  ngOnDestroy() {
    if (this.getHeaderDetailsSubscriber) {
      this.getHeaderDetailsSubscriber.unsubscribe();
    }
  }

  /**
   * update tab title
   * @param newTitle<string> - tab title
   */
  updateTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
