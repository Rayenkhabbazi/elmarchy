import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadproductsComponent } from './loadproducts.component';

describe('LoadproductsComponent', () => {
  let component: LoadproductsComponent;
  let fixture: ComponentFixture<LoadproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadproductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
