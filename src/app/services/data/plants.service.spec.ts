import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { PlantsService } from './plants.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {PlantDetails} from "../../interfaces/Plants";

describe('PlantsService', () => {
  let service: PlantsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PlantsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve plant details via HTTP GET', fakeAsync(() => {
    const mockPlantId = 'mockId';
    const mockResponse: PlantDetails = {
      address : "Test",
      city : "Test",
      country : "Test",
      default_language : "Test",
      description : "Test",
      division : "Test",
      id : "Test",
      manager: "Test",
      name: "Test",
      phone: "Test"
    };

    service.getPlantDetails(mockPlantId).subscribe((data: PlantDetails) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.plantDataUrl}/${mockPlantId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    tick();
  }));

});
