import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAssociateComponent } from './product-associate.component';

describe('ProductAssociateComponent', () => {
  let component: ProductAssociateComponent;
  let fixture: ComponentFixture<ProductAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
