import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcMenuComponent } from './lc-menu.component';

describe('LcMenuComponent', () => {
  let component: LcMenuComponent;
  let fixture: ComponentFixture<LcMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
