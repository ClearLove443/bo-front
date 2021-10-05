import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberAddPage } from './member-add.page';

describe('MemberAddPage', () => {
  let component: MemberAddPage;
  let fixture: ComponentFixture<MemberAddPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberAddPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
