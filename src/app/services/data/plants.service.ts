import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {PlantDetails, PlantsResponse} from "../../interfaces/Plants";
import {PLANT_DATA_URL} from "./constants";

@Injectable({
  providedIn: 'root'
})
export class PlantsService {
  plantDataUrl : string = PLANT_DATA_URL

  constructor(private http: HttpClient) { }

  /**
   * fetch plant data from the API and returns
   * @param offset<string>
   * @returns plant list  as Observable<PlantsResponse>
   */
  getPlants(offset : string): Observable<PlantsResponse> {
    return this.http.get<any>(`${this.plantDataUrl}${offset || ""}`).pipe(
      map(response => {
        return {
          plants: <Array<PlantDetails>>response.results,
          next: <string>response.next
        };
      })
    )
  }

  /**
   * fetch plant details for particular plant id
   * @param plantId<string> - plant id
   * @returns plant details  as Observable<PlantDetails>
   */
  getPlantDetails (plantId : string) : Observable<PlantDetails> {
    return this.http.get<any>(`${this.plantDataUrl}/${plantId}`).pipe(
      map(response => {
        return response;
      })
    )
  }

}
