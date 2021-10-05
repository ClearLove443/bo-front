import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberListPage } from './member-list.page';

describe('ListComponent', () => {
  let component: MemberListPage;
  let fixture: ComponentFixture<MemberListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberListPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
