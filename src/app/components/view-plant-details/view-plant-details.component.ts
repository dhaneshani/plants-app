import { Component } from '@angular/core';
import {headerDetails, HeaderService} from "../../services/header/header.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlantsService} from "../../services/data/plants.service";
import {PlantDetails} from "../../interfaces/Plants";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-view-plant-details',
  standalone: true,
  imports: [],
  templateUrl: './view-plant-details.component.html',
  styleUrl: './view-plant-details.component.css'
})
export class ViewPlantDetailsComponent {
  constructor(private headerService : HeaderService,
              private plantsService : PlantsService,
              private activatedRoute : ActivatedRoute,
              private router : Router) {
  }
  routerSubscriber! : Subscription;
  plantDetailsSubscriber! : Subscription;
  plantDetails! : PlantDetails;

  /**
   * initialize component
   */
  ngOnInit(): void {
    this.routerSubscriber = this.activatedRoute?.paramMap?.subscribe((params) => {
      const selectedPlantId = params.get('plantId') || "";
      this.loadPlantDetails(selectedPlantId);
    });
  }

  /**
   * unsubscribe subscription before component destroyed
   */
  ngOnDestroy() {
    if (this.routerSubscriber) {
      this.routerSubscriber.unsubscribe();
    }
    if (this.plantDetailsSubscriber) {
      this.plantDetailsSubscriber.unsubscribe();
    }
  }

  /**
   * load plant details from the plant service
   * @param plantId<string> - plant id
   */
  loadPlantDetails (plantId : string) {
    this.plantDetailsSubscriber = this.plantsService.getPlantDetails(plantId).subscribe(data => {
      this.plantDetails = data;
      this.setDetailsInHeader(this.plantDetails.name, this.plantDetails.division);
    });
  }

  /**
   * set details in header once plant details loaded
   * @param title<string> - header title
   * @param subTitle<string> - header sub title
   */
  setDetailsInHeader (title : string, subTitle : string) {
    this.headerService.setHeaderDetails(new headerDetails(title, subTitle, true, "Back to all plants", () => {
      this.router.navigate(['/plants']);
    }));
  }

}
