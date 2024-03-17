import { Component } from '@angular/core';
import {headerDetails, HeaderService} from "../../services/header/header.service";
import {PlantsService} from "../../services/data/plants.service";
import {NgForOf, NgIf} from "@angular/common";
import {PlantDetails} from "../../interfaces/Plants";
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent {
  plants : Array<PlantDetails> = [];
  itemLoadingInProgress = false;
  next : string = "";
  private getPlantsSubscriber! : Subscription
  constructor(private headerService : HeaderService,
              private plantsService : PlantsService) {
  }

  /**
   * initialize component
   */
  ngOnInit(): void {
    this.setHeaderDetails();
    this.loadPlants(this.next);
  }

  /**
   * unsubscribe subscription before component destroyed
   */
  ngOnDestroy() {
    if (this.getPlantsSubscriber) {
      this.getPlantsSubscriber.unsubscribe();
    }
  }

  /**
   * load more plant details once load more button clicked
   */
  loadMorePlants () {
    this.loadPlants(this.next);
  }

  /**
   * check if there are more data to be loaded
   */
  checkIfMoreDataAvailable () {
    return this.next;
  }

  /**
   * plant data from the plant service
   * @param next<string> - offset parameter
   */
  loadPlants (next : string) {
    this.itemLoadingInProgress = true;
    this.getPlantsSubscriber = this.plantsService.getPlants(next).subscribe(data => {
      this.plants = [...this.plants, ...data.plants];
      this.next = data.next;
      this.itemLoadingInProgress = false;
    });
  }

  /**
   * set details in header once plant list loaded
   * @private
   */
  private setHeaderDetails () {
    this.headerService.setHeaderDetails(new headerDetails("Plants", "", false, "", null));
  }
}
