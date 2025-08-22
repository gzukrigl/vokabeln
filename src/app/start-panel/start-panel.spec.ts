import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPanel } from './start-panel';

describe('StartPanel', () => {
  let component: StartPanel;
  let fixture: ComponentFixture<StartPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
