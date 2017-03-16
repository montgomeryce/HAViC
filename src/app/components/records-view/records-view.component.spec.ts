import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsViewComponent } from './records-view.component';

describe('RecordsViewComponent', () => {
  let component: RecordsViewComponent;
  let fixture: ComponentFixture<RecordsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
