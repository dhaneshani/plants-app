import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ViewPlantDetailsComponent } from './view-plant-details.component';
import {headerDetails, HeaderService} from '../../services/header/header.service';
import { PlantsService } from '../../services/data/plants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PlantDetails } from '../../interfaces/Plants';

describe('ViewPlantDetailsComponent', () => {
  let component: ViewPlantDetailsComponent;
  let fixture: ComponentFixture<ViewPlantDetailsComponent>;
  let headerService: jasmine.SpyObj<HeaderService>;
  let plantsService: jasmine.SpyObj<PlantsService>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    const headerServiceSpy = jasmine.createSpyObj('HeaderService', ['setHeaderDetails']);
    const plantsServiceSpy = jasmine.createSpyObj('PlantsService', ['getPlantDetails']);
    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: () => '1' // Assume plantId is always '1' for testing
        }
      }
    };
    const routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [ViewPlantDetailsComponent],
      providers: [
        { provide: HeaderService, useValue: headerServiceSpy },
        { provide: PlantsService, useValue: plantsServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlantDetailsComponent);
    component = fixture.componentInstance;
    headerService = TestBed.inject(HeaderService) as jasmine.SpyObj<HeaderService>;
    plantsService = TestBed.inject(PlantsService) as jasmine.SpyObj<PlantsService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should load plant details', fakeAsync(() => {
    const mockPlantId = 'mockId';
    const mockPlantDetails = { name: 'Mock Plant', division: 'Mock Division' };

    // @ts-ignore
    plantsService.getPlantDetails.and.returnValue(of(mockPlantDetails));
    spyOn(component, 'setDetailsInHeader');

    component.loadPlantDetails(mockPlantId);
    tick();

    // @ts-ignore
    expect(component.plantDetails).toEqual(mockPlantDetails);
    expect(component.setDetailsInHeader).toHaveBeenCalledWith(mockPlantDetails.name, mockPlantDetails.division);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /plants when back button is clicked', () => {
    const mockTitle = 'Mock Title';
    const mockSubTitle = 'Mock Subtitle';

    component.setDetailsInHeader(mockTitle, mockSubTitle);
    const backButtonFunction = headerService.setHeaderDetails.calls.mostRecent().args[0].action;

    // @ts-ignore
    backButtonFunction();

    expect(router.navigate).toHaveBeenCalledWith(['/plants']);
  });

  it('should unsubscribe on component destruction', () => {
    if (component.routerSubscriber && component.plantDetailsSubscriber) {
      spyOn(component.routerSubscriber, 'unsubscribe');
      spyOn(component.plantDetailsSubscriber, 'unsubscribe');

      fixture.destroy();

      expect(component.routerSubscriber.unsubscribe).toHaveBeenCalled();
      expect(component.plantDetailsSubscriber.unsubscribe).toHaveBeenCalled();
    }
  });


});
