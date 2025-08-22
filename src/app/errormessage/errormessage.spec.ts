import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Errormessage } from './errormessage';

describe('Errormessage', () => {
  let component: Errormessage;
  let fixture: ComponentFixture<Errormessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Errormessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Errormessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
