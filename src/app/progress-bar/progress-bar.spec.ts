import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBar } from './progress-bar';

describe('ProgressBar', () => {
  let component: ProgressBar;
  let fixture: ComponentFixture<ProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
