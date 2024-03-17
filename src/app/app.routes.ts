import { Routes } from '@angular/router';
import {PlantsComponent} from "./components/plants/plants.component";
import {ViewPlantDetailsComponent} from "./components/view-plant-details/view-plant-details.component";

export const routes: Routes = [
  {path: '', redirectTo: '/plants', pathMatch: 'full'},
  {path:"plants", component:PlantsComponent},
  {path:"plants/:plantId", component:ViewPlantDetailsComponent},
];
