import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VokabelForm } from './vokabel-form';

describe('VokabelForm', () => {
  let component: VokabelForm;
  let fixture: ComponentFixture<VokabelForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VokabelForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VokabelForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
