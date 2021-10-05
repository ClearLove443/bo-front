import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeunComponent } from './meun.component';

describe('MeunComponent', () => {
  let component: MeunComponent;
  let fixture: ComponentFixture<MeunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
