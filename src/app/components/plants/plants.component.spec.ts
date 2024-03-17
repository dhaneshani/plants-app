import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsComponent } from './plants.component';
import { HttpClientModule } from '@angular/common/http';

describe('PlantsComponent', () => {
  let component: PlantsComponent;
  let fixture: ComponentFixture<PlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantsComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadPlants with next parameter', () => {
    // @ts-ignore
    spyOn(component, 'loadPlants');
    const mockNext: string = 'nextParameter';

    component.next = mockNext;
    component.loadMorePlants();

    expect(component.loadPlants).toHaveBeenCalledWith(mockNext);
  });

});
