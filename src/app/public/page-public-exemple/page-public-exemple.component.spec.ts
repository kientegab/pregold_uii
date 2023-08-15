import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePublicExempleComponent } from './page-public-exemple.component';

describe('PagePublicExempleComponent', () => {
  let component: PagePublicExempleComponent;
  let fixture: ComponentFixture<PagePublicExempleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePublicExempleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePublicExempleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
