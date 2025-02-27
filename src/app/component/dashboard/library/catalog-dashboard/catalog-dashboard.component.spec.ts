import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogDashboardComponent } from './catalog-dashboard.component';

describe('CatalogDashboardComponent', () => {
  let component: CatalogDashboardComponent;
  let fixture: ComponentFixture<CatalogDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
