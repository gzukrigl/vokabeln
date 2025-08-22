import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feuerwerk } from './feuerwerk';

describe('Feuerwerk', () => {
  let component: Feuerwerk;
  let fixture: ComponentFixture<Feuerwerk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feuerwerk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feuerwerk);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
